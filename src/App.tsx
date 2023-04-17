import { useState } from 'react';
import './App.css';
import { DraggableInput } from './DraggableInput';
import { LIFT_ORDER, LiftSlice, computeZones } from './Lifts';
import { Row } from './Row';

function App() {
  let [bodyWeight, setBodyWeight] = useState(190);
  bodyWeight = Math.max(bodyWeight ? bodyWeight : 0, 0)
  const zones = computeZones(bodyWeight)
  let [currentSquat, setCurrentSquat] = useState(zones.noob.squat);
  let [currentBp, setCurrentBp] = useState(zones.noob.bp);
  let [currentRow, setCurrentRow] = useState(zones.noob.row);
  let [currentOhp, setCurrentOhp] = useState(zones.noob.ohp);
  let [currentDl, setCurrentDl] = useState(zones.noob.dl);
  const currentWeights: LiftSlice = {
    squat: currentSquat,
    bp: currentBp,
    row: currentRow,
    ohp: currentOhp,
    dl: currentDl
  }
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontSize: 14,
    }}>
      <div style={{display: 'flex', overflow: 'none'}}>
        <label htmlFor="bodyweight">Body Weight</label>
        <DraggableInput
          id="bodyweight"
          value={bodyWeight}
          onChange={(e) => setBodyWeight(e)}
          step={1}
          pixelsPerStep={1}
          min={60}
          max={600}
        ></DraggableInput>
      </div>
      <div style={{display: 'flex', overflow: 'none'}}>
        <label htmlFor="currentSquat">Current Squat</label>
        <DraggableInput
          id="currentSquat"
          value={currentSquat}
          onChange={(e) => setCurrentSquat(e)}
          step={5}
          pixelsPerStep={3}
          min={zones.min['squat']}
          max={zones.advanced['squat']}
        ></DraggableInput>
      </div>
      <div style={{display: 'flex', overflow: 'none'}}>
        <label htmlFor="currentBp">Current BP</label>
        <DraggableInput
          id="currentBp"
          value={currentBp}
          onChange={(e) => setCurrentBp(e)}
          step={5}
          pixelsPerStep={3}
          min={zones.min['bp']}
          max={zones.advanced['bp']}
        ></DraggableInput>
      </div>
      <div style={{display: 'flex', overflow: 'none'}}>
        <label htmlFor="currentRow">Current Row</label>
        <DraggableInput
          id="currentRow"
          value={currentRow}
          onChange={(e) => setCurrentRow(e)}
          step={5}
          pixelsPerStep={3}
          min={zones.min['row']}
          max={zones.advanced['row']}
        ></DraggableInput>
      </div>
      <div style={{display: 'flex', overflow: 'none'}}>
        <label htmlFor="currentOhp">Current OHP</label>
        <DraggableInput
          id="currentOhp"
          value={currentOhp}
          onChange={(e) => setCurrentOhp(e)}
          step={5}
          pixelsPerStep={3}
          min={zones.min['ohp']}
          max={zones.advanced['ohp']}
        ></DraggableInput>
      </div>
      <div style={{display: 'flex', overflow: 'none'}}>
        <label htmlFor="currentDl">Current DL</label>
        <DraggableInput
          id="currentDl"
          value={currentDl}
          onChange={(e) => setCurrentDl(e)}
          step={5}
          pixelsPerStep={3}
          min={zones.min['dl']}
          max={zones.advanced['dl']}
        ></DraggableInput>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {LIFT_ORDER.map(lift => (
          <Row key={lift} {...{zones, currentWeights, lift}} />
        ))}
      </div>
    </div>
  );
}

export default App;
