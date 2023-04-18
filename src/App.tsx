import './App.css';

import { useState } from 'react';

import { Distances } from './Distances';
import { Inputs } from './Inputs';
import { Legend } from './Legend';
import { computeZones, LiftSlice } from './Lifts';
import { Ratios } from './Ratios';
import { Sliders } from './Sliders';

function App() {
  const [bodyWeight, setBodyWeight] = useState(190);
  const zones = computeZones(bodyWeight);
  const [currentSquat, setCurrentSquat] = useState(zones.noob.squat);
  const [currentBp, setCurrentBp] = useState(zones.noob.bp);
  const [currentRow, setCurrentRow] = useState(zones.noob.row);
  const [currentOhp, setCurrentOhp] = useState(zones.noob.ohp);
  const [currentDl, setCurrentDl] = useState(zones.noob.dl);
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
      <Sliders {...{ zones, currentWeights }} />
      <Legend />
      <Ratios bodyWeight={bodyWeight} weights={currentWeights} />
      <Distances {...{ currentWeights, zones }} />
      <Inputs
        {...{
          zones,
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
    </div>
  );
}

export default App;
