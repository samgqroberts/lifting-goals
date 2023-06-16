import { Lift, LIFT_ORDER, LiftSlice, names, Threshold, Thresholds } from './Lifts';

const getNextThreshold = (thresholds: Thresholds, lift: Lift, currentWeights: LiftSlice): Threshold | null => {
  return thresholds[lift].find((threshold) => currentWeights[lift] < threshold.value) || null;
};

const distanceToLevel = (
  lift: Lift,
  level: Threshold | null,
  currentWeights: LiftSlice,
): { pounds: number; sessions: number } | null => {
  if (!level) return null;
  const increasePerSessions = lift === 'dl' ? 10 : 5;
  const pounds = level.value - currentWeights[lift];
  const sessions = Math.ceil(pounds / increasePerSessions);
  return { pounds, sessions };
};

export const Distances: React.FC<{ currentWeights: LiftSlice; thresholds: Thresholds }> = ({
  currentWeights,
  thresholds,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20, padding: '0 10px' }}>
      {LIFT_ORDER.map((lift) => {
        const nextLevel = getNextThreshold(thresholds, lift, currentWeights);
        const distance = distanceToLevel(lift, nextLevel, currentWeights);
        return (
          <span key={lift}>
            {distance &&
              nextLevel &&
              `${names[lift]}: ${distance.pounds} lb (${distance.sessions} ${
                distance.sessions === 1 ? 'session' : 'sessions'
              } without fail) until ${nextLevel.goalName}`}
          </span>
        );
      })}
    </div>
  );
};
