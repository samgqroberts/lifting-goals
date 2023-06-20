import './App.css';

import { useEffect, useState } from 'react';

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

function App() {
  // on app load, check localstorage to see if this is the user's first visit
  // if so, show help modal
  const [hasVisited, setHasVisited] = useState(true);
  useEffect(() => {
    if (window.localStorage.getItem('hasVisited') !== '1') {
      setHasVisited(false);
      window.localStorage.setItem('hasVisited', '1');
    }
  }, []);
  // app state
  const [goals, setGoals] = useState<Goal[]>(NIPPARD_GOALS);
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
