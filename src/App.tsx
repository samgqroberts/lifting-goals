import './App.css';

import { useState } from 'react';

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
  const [goals, setGoals] = useState<Goal[]>(NIPPARD_GOALS);
  const bodyWeightInfo = useState(190);
  const [bodyWeight, setBodyWeight] = bodyWeightInfo;
  const thresholds = computeThresholds(goals, bodyWeight);
  const [currentSquat, setCurrentSquat] = useState(beginnerValuesFromNippard.squat as number);
  const [currentBp, setCurrentBp] = useState(beginnerValuesFromNippard.bp as number);
  const [currentRow, setCurrentRow] = useState(beginnerValuesFromNippard.row as number);
  const [currentOhp, setCurrentOhp] = useState(beginnerValuesFromNippard.ohp as number);
  const [currentDl, setCurrentDl] = useState(beginnerValuesFromNippard.dl as number);
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
      <Ratios bodyWeight={bodyWeight} weights={currentWeights} />
      <Distances {...{ currentWeights, thresholds }} />
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
      <Bottom {...{ bodyWeight, goals, setGoals }} />
    </div>
  );
}

export default App;
