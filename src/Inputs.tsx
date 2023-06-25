import { LabeledDraggableInput } from './LabeledDraggableInput';
import { LiftSlice } from './Lifts';
import { combineStyles } from './utils';

const InputRow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 14, width: '80%' }}>{children}</div>;
};

export const Inputs: React.FC<{
  style?: React.CSSProperties;
  minimums: LiftSlice;
  maximums: LiftSlice;
  asRatio: boolean;
  bodyWeightInfo?: [number, (value: number) => void];
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
  style,
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
  const stepX = asRatio ? 0.01 : 5;
  const stepY = asRatio ? 0.01 : 5;
  const pixelsPerStepX = asRatio ? 10 : 15;
  const pixelsPerStepY = asRatio ? 10 : 15;
  return (
    <div
      style={combineStyles(
        { display: 'flex', flexDirection: 'column', marginTop: 'auto', alignItems: 'center' },
        style,
      )}
    >
      {/* top row */}
      <InputRow>
        {bodyWeightInfo && (
          <LabeledDraggableInput
            label="Body Weight"
            value={bodyWeightInfo[0]}
            onChange={(e) => bodyWeightInfo[1](e)}
            stepX={1}
            stepY={1}
            pixelsPerStepX={8}
            pixelsPerStepY={8}
            min={60}
            max={600}
          />
        )}
        <LabeledDraggableInput
          label="Squat"
          value={currentSquat}
          onChange={(e) => setCurrentSquat(e)}
          {...{ stepX, stepY, pixelsPerStepX, pixelsPerStepY }}
          min={minimums.squat}
          max={maximums.squat}
        />
        <LabeledDraggableInput
          label="Bench"
          value={currentBp}
          onChange={(e) => setCurrentBp(e)}
          {...{ stepX, stepY, pixelsPerStepX, pixelsPerStepY }}
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
          {...{ stepX, stepY, pixelsPerStepX, pixelsPerStepY }}
          min={minimums.row}
          max={maximums.row}
        />
        <LabeledDraggableInput
          label="OHP"
          value={currentOhp}
          onChange={(e) => setCurrentOhp(e)}
          {...{ stepX, stepY, pixelsPerStepX, pixelsPerStepY }}
          min={minimums.ohp}
          max={maximums.ohp}
        />
        <LabeledDraggableInput
          label="Deadlift"
          value={currentDl}
          onChange={(e) => setCurrentDl(e)}
          {...{ stepX, stepY, pixelsPerStepX, pixelsPerStepY }}
          min={minimums.dl}
          max={maximums.dl}
        />
      </InputRow>
    </div>
  );
};
