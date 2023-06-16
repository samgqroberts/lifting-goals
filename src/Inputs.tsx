import { LabeledDraggableInput } from './LabeledDraggableInput';
import { LiftSlice } from './Lifts';

const InputRow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 30 }}>{children}</div>;
};

export const Inputs: React.FC<{
  minimums: LiftSlice;
  maximums: LiftSlice;
  asRatio: boolean;
  bodyWeightInfo?: [number, React.Dispatch<React.SetStateAction<number>>];
  currentSquat: number;
  currentBp: number;
  currentRow: number;
  currentOhp: number;
  currentDl: number;
  setCurrentSquat: (value: number) => void;
  setCurrentBp: (value: number) => void;
  setCurrentRow: (value: number) => void;
  setCurrentOhp: (value: number) => void;
  setCurrentDl: (value: number) => void;
}> = ({
  minimums,
  maximums,
  asRatio,
  bodyWeightInfo,
  currentSquat,
  currentBp,
  currentRow,
  currentOhp,
  currentDl,
  setCurrentSquat,
  setCurrentBp,
  setCurrentRow,
  setCurrentOhp,
  setCurrentDl,
}) => {
  const step = asRatio ? 0.01 : 5;
  const pixelsPerStep = asRatio ? 2 : 3;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto', marginBottom: 20 }}>
      {/* top row */}
      <InputRow>
        {bodyWeightInfo && (
          <LabeledDraggableInput
            label="Body Weight"
            value={bodyWeightInfo[0]}
            onChange={(e) => bodyWeightInfo[1](e)}
            step={1}
            pixelsPerStep={1}
            min={60}
            max={600}
          />
        )}
        <LabeledDraggableInput
          label="Squat"
          value={currentSquat}
          onChange={(e) => setCurrentSquat(e)}
          {...{ step, pixelsPerStep }}
          min={minimums.squat}
          max={maximums.squat}
        />
        <LabeledDraggableInput
          label="Bench"
          value={currentBp}
          onChange={(e) => setCurrentBp(e)}
          {...{ step, pixelsPerStep }}
          min={minimums.bp}
          max={maximums.squat}
        />
      </InputRow>
      {/* bottom row */}
      <InputRow>
        <LabeledDraggableInput
          label="Row"
          value={currentRow}
          onChange={(e) => setCurrentRow(e)}
          {...{ step, pixelsPerStep }}
          min={minimums.row}
          max={maximums.row}
        />
        <LabeledDraggableInput
          label="OHP"
          value={currentOhp}
          onChange={(e) => setCurrentOhp(e)}
          {...{ step, pixelsPerStep }}
          min={minimums.ohp}
          max={maximums.ohp}
        />
        <LabeledDraggableInput
          label="Deadlift"
          value={currentDl}
          onChange={(e) => setCurrentDl(e)}
          {...{ step, pixelsPerStep }}
          min={minimums.dl}
          max={maximums.dl}
        />
      </InputRow>
    </div>
  );
};
