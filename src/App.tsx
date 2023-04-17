import { useState } from 'react';
import './App.css';
import { LabeledDraggableInput } from './LabeledDraggableInput';
import { LIFT_ORDER, LiftSlice, computeZones } from './Lifts';
import { Row } from './Row';
import { Legend } from './Legend';

const InputRow: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly', marginTop: 30}}>
      {children}
    </div>
  )
}

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
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontSize: 14,
    }}>
      {/* sliders */}
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {LIFT_ORDER.map(lift => (
          <Row key={lift} {...{zones, currentWeights, lift}} />
        ))}
      </div>
      {/* legend */}
      <Legend />
      {/* inputs */}
      <div style={{display: 'flex', flexDirection: 'column', marginTop: 'auto', marginBottom: 20}}>
        {/* top row */}
        <InputRow>
          <LabeledDraggableInput
              label="Body Weight"
              value={bodyWeight}
              onChange={(e) => setBodyWeight(e)}
              step={1}
              pixelsPerStep={1}
              min={60}
              max={600}
          />
          <LabeledDraggableInput
              label="Squat"
              value={currentSquat}
              onChange={(e) => setCurrentSquat(e)}
              step={5}
              pixelsPerStep={3}
              min={zones.min['squat']}
              max={zones.advanced['squat']}
          />
          <LabeledDraggableInput
              label="Bench"
              value={currentBp}
              onChange={(e) => setCurrentBp(e)}
              step={5}
              pixelsPerStep={3}
              min={zones.min['bp']}
              max={zones.advanced['bp']}
          />
        </InputRow>
        {/* bottom row */}
        <InputRow>
          <LabeledDraggableInput
              label="Row"
              value={currentRow}
              onChange={(e) => setCurrentRow(e)}
              step={5}
              pixelsPerStep={3}
              min={zones.min['row']}
              max={zones.advanced['row']}
          />
          <LabeledDraggableInput
              label="OHP"
              value={currentOhp}
              onChange={(e) => setCurrentOhp(e)}
              step={5}
              pixelsPerStep={3}
              min={zones.min['ohp']}
              max={zones.advanced['ohp']}
          />
          <LabeledDraggableInput
              label="Deadlift"
              value={currentDl}
              onChange={(e) => setCurrentDl(e)}
              step={5}
              pixelsPerStep={3}
              min={zones.min['dl']}
              max={zones.advanced['dl']}
          />
        </InputRow>
      </div>
    </div>
  );
}

export default App;
