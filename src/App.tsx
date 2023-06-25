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
import { useRequiredLocalStorage } from './useLocalStorage';

const HAS_VISITED_LOCALSTORAGE_KEY = 'hasVisited';
const GOALS_LOCALSTORAGE_KEY = 'goals';

const safeJSONParse = (str: string): unknown => {
  try {
    return JSON.parse(str);
  } catch {
    return undefined;
  }
};

const deserializeGoals = (value: string): Goal[] | undefined => {
  const rawParsed = safeJSONParse(value);
  if (is(rawParsed, array(Goal))) {
    return rawParsed;
  }
  return undefined;
};

const parseNumber = (value: string): number | undefined => {
  const parsed = parseFloat(value);
  return typeof parsed === 'number' && !isNaN(parsed) ? parsed : undefined;
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
  // other app state that's saved to localstorage
  const [goals, setGoals] = useRequiredLocalStorage(GOALS_LOCALSTORAGE_KEY, NIPPARD_GOALS, [
    deserializeGoals,
    JSON.stringify,
  ]);
  const bodyWeightInfo = useRequiredLocalStorage('bodyWeight', 190, [parseNumber, (value) => '' + value]);
  const [bodyWeight, setBodyWeight] = bodyWeightInfo;
  const [currentSquat, setCurrentSquat] = useRequiredLocalStorage('squat', beginnerValuesFromNippard.squat as number, [
    parseNumber,
    (value) => '' + value,
  ]);
  const [currentBp, setCurrentBp] = useRequiredLocalStorage('bp', beginnerValuesFromNippard.bp as number, [
    parseNumber,
    (value) => '' + value,
  ]);
  const [currentRow, setCurrentRow] = useRequiredLocalStorage('row', beginnerValuesFromNippard.row as number, [
    parseNumber,
    (value) => '' + value,
  ]);
  const [currentOhp, setCurrentOhp] = useRequiredLocalStorage('ohp', beginnerValuesFromNippard.ohp as number, [
    parseNumber,
    (value) => '' + value,
  ]);
  const [currentDl, setCurrentDl] = useRequiredLocalStorage('dl', beginnerValuesFromNippard.dl as number, [
    parseNumber,
    (value) => '' + value,
  ]);
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
        width: '100%',
        display: 'flex',
        overflow: 'hidden',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontSize: 14,
          maxWidth: 1080,
          flexGrow: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            flexGrow: 1,
            paddingBottom: 10,
          }}
        >
          <Sliders {...{ thresholds, currentWeights }} />
          <Legend {...{ goals }} />
          <Distances {...{ currentWeights, thresholds }} />
          <Ratios bodyWeight={bodyWeight} weights={currentWeights} />
        </div>
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
    </div>
  );
}

export default App;
