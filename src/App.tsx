import './App.css';

import { useEffect, useState } from 'react';
import { array, is } from 'superstruct';

import { Bottom } from './Bottom';
import { Distances } from './Distances';
import { Inputs } from './Inputs';
import { Legend } from './Legend';
import {
  beginnerValuesFromNippard,
  computeThresholds,
  Goal,
  LiftSlice,
  maximums,
  minimums,
  NIPPARD_GOALS,
} from './Lifts';
import { Ratios } from './Ratios';
import { Sliders } from './Sliders';
import { useLocalStorage } from './useLocalStorage';

const HAS_VISITED_LOCALSTORAGE_KEY = 'hasVisited';
const GOALS_LOCALSTORAGE_KEY = 'goals';

const safeJSONParse = (str: string): unknown => {
  try {
    return JSON.parse(str);
  } catch {
    return undefined;
  }
};

const deserializeGoals = (str: string | undefined): Goal[] | undefined => {
  if (!str) return undefined;
  const rawParsed = safeJSONParse(str);
  if (is(rawParsed, array(Goal))) {
    return rawParsed;
  }
  return undefined;
};

const useGoalsState = (): [Goal[], (value: Goal[]) => void] => {
  const [goalsRaw, setGoalsRaw] = useLocalStorage(GOALS_LOCALSTORAGE_KEY, JSON.stringify(NIPPARD_GOALS));
  const goalsParsed = deserializeGoals(goalsRaw);
  const goals: Goal[] = goalsParsed ? goalsParsed : NIPPARD_GOALS;
  const setGoals = (goals: Goal[]) => {
    setGoalsRaw(JSON.stringify(goals));
  };
  return [goals, setGoals];
};

function App() {
  // on app load, check localstorage to see if this is the user's first visit
  // if so, show help modal
  const [hasVisited, setHasVisited] = useState(true);
  useEffect(() => {
    if (window.localStorage.getItem(HAS_VISITED_LOCALSTORAGE_KEY) !== '1') {
      setHasVisited(false);
      window.localStorage.setItem(HAS_VISITED_LOCALSTORAGE_KEY, '1');
    }
  }, []);
  // app state
  const [goals, setGoals] = useGoalsState();
  const bodyWeightInfo = useState(190);
  const [bodyWeight, setBodyWeight] = bodyWeightInfo;
  const [currentSquat, setCurrentSquat] = useState(beginnerValuesFromNippard.squat as number);
  const [currentBp, setCurrentBp] = useState(beginnerValuesFromNippard.bp as number);
  const [currentRow, setCurrentRow] = useState(beginnerValuesFromNippard.row as number);
  const [currentOhp, setCurrentOhp] = useState(beginnerValuesFromNippard.ohp as number);
  const [currentDl, setCurrentDl] = useState(beginnerValuesFromNippard.dl as number);
  // derived state
  const thresholds = computeThresholds(goals, bodyWeight);
  const currentWeights: LiftSlice = {
    squat: currentSquat,
    bp: currentBp,
    row: currentRow,
    ohp: currentOhp,
    dl: currentDl,
  };
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontSize: 14,
      }}
    >
      <Sliders {...{ thresholds, currentWeights }} />
      <Legend {...{ goals }} />
      <Distances {...{ currentWeights, thresholds }} />
      <Ratios bodyWeight={bodyWeight} weights={currentWeights} />
      <Inputs
        {...{
          minimums: minimums,
          maximums: maximums,
          asRatio: false,
          bodyWeightInfo,
          bodyWeight,
          currentSquat,
          currentBp,
          currentRow,
          currentOhp,
          currentDl,
          setBodyWeight,
          setCurrentSquat,
          setCurrentBp,
          setCurrentRow,
          setCurrentOhp,
          setCurrentDl,
        }}
      />
      <Bottom {...{ bodyWeight, goals, setGoals, hasVisited }} />
    </div>
  );
}

export default App;
