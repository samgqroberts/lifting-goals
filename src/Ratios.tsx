import { LiftSlice, names } from './Lifts';

const percentify = (value: number) => `${(value * 100).toFixed(1)}%`;

export const Ratios: React.FC<{
  bodyWeight: number;
  weights: LiftSlice;
}> = ({ bodyWeight, weights }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 15 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
        <span style={{ fontWeight: 'bold', marginBottom: 5 }}>% of BW</span>
        {(['squat', 'bp', 'row', 'ohp', 'dl'] as const).map((lift) => {
          return (
            <span key={lift}>
              {names[lift]} {percentify(weights[lift] / bodyWeight)}
            </span>
          );
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontWeight: 'bold', marginBottom: 5 }}>% of Squat</span>
        {([null, 'bp', 'row', 'ohp', 'dl'] as const).map((lift) => {
          if (!lift) return <span key={lift}>&nbsp;</span>;
          return (
            <span key={lift}>
              {percentify(weights[lift] / weights.squat)} {names[lift]}
            </span>
          );
        })}
      </div>
    </div>
  );
};
