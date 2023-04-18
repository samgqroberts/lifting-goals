import { LabeledDraggableInput } from './LabeledDraggableInput';
import { Zones } from './Lifts';

const InputRow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 30 }}>{children}</div>;
};

export const Inputs: React.FC<{
  zones: Zones;
  bodyWeight: number;
  currentSquat: number;
  currentBp: number;
  currentRow: number;
  currentOhp: number;
  currentDl: number;
  setBodyWeight: React.Dispatch<React.SetStateAction<number>>;
  setCurrentSquat: React.Dispatch<React.SetStateAction<number>>;
  setCurrentBp: React.Dispatch<React.SetStateAction<number>>;
  setCurrentRow: React.Dispatch<React.SetStateAction<number>>;
  setCurrentOhp: React.Dispatch<React.SetStateAction<number>>;
  setCurrentDl: React.Dispatch<React.SetStateAction<number>>;
}> = ({
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
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto', marginBottom: 20 }}>
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
  );
};
