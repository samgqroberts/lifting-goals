import { DraggableInput, DraggableInputChangeHandler } from './DraggableInput';
import { Red, White } from './styles';
import { combineStyles, OverrideDivProps } from './utils';

interface UniqueDraggableInputProps {
  label: string;
  value: number;
  onChange: DraggableInputChangeHandler;
  step?: number;
  pixelsPerStep?: number;
  min?: number;
  max?: number;
}

type LabeledDraggableInputProps = OverrideDivProps<UniqueDraggableInputProps>;

export const LabeledDraggableInput: React.FC<LabeledDraggableInputProps> = ({
  label,
  value,
  onChange,
  step,
  pixelsPerStep,
  min,
  max,
  style,
  ...divProps
}) => {
  return (
    <div
      style={combineStyles(style, {
        display: 'flex',
        overflow: 'none',
        flexDirection: 'column',
        alignItems: 'center',
        width: 100,
      })}
      {...divProps}
    >
      <DraggableInput
        id={label}
        {...{ value, onChange, step, pixelsPerStep, min, max }}
        style={{
          borderRadius: '50%',
          height: 30,
          width: 30,
          background: Red,
          color: White,
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      ></DraggableInput>
      <label htmlFor={label} style={{ fontWeight: 'bold', textAlign: 'center' }}>
        {label}
      </label>
    </div>
  );
};
