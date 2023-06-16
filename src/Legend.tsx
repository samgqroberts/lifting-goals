import { Goal } from './Lifts';
import { colorForZoneIndex } from './styles';

const margin = 20;
const lineWidth = 3;

export const Legend: React.FC<{ goals: Goal[] }> = ({ goals }) => {
  return (
    <div style={{ display: 'flex', width: `calc(100% - ${2 * margin}px)`, marginLeft: margin, marginTop: 10 }}>
      {[{ name: 'starting', basedOnBodyWeight: false, values: [] }, ...goals.slice(0, goals.length - 1)].map(
        (goal, i) => {
          return (
            <div
              key={goal.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '25%',
                alignItems: 'center',
                marginTop: `${i * lineWidth}px`,
              }}
            >
              <span>{goal.name}</span>
              <div style={{ height: lineWidth, width: '100%', background: colorForZoneIndex(i) }} />
            </div>
          );
        },
      )}
    </div>
  );
};
