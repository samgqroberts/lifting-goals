import { Lift, LIFT_ORDER, LiftSlice, names, Zones } from './Lifts';

type Level = 'noob' | 'beginner' | 'intermediate' | 'advanced';
const levels = ['noob', 'beginner', 'intermediate', 'advanced'] as const;

const findCurrentLevel = (zones: Zones, lift: Lift, currentWeights: LiftSlice): Level | null => {
  return (
    levels.find((level) => {
      const threshold = zones[level][lift];
      return currentWeights[lift] < threshold;
    }) || null
  );
};

const nextLevel = (
  current: 'noob' | 'beginner' | 'intermediate' | 'advanced' | null,
): 'beginner' | 'intermediate' | 'advanced' | 'off the chart' => {
  if (current === 'noob') return 'beginner';
  if (current === 'beginner') return 'intermediate';
  if (current === 'intermediate') return 'advanced';
  return 'off the chart';
};

const distanceToLevel = (
  zones: Zones,
  level: Omit<Level, 'noob'> | 'off the charts',
  lift: Lift,
  currentWeights: LiftSlice,
): { pounds: number; sessions: number } => {
  const increasePerSessions = lift === 'dl' ? 10 : 5;
  let liftSlice = zones.advanced;
  if (level === 'advanced') {
    liftSlice = zones.intermediate;
  } else if (level === 'intermediate') {
    liftSlice = zones.beginner;
  } else if (level === 'beginner') {
    liftSlice = zones.noob;
  }
  const threshold = liftSlice[lift];
  const pounds = threshold - currentWeights[lift];
  const sessions = Math.ceil(pounds / increasePerSessions);
  return { pounds, sessions };
};

export const Distances: React.FC<{ currentWeights: LiftSlice; zones: Zones }> = ({ currentWeights, zones }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20, padding: '0 10px' }}>
      {LIFT_ORDER.map((lift) => {
        const currentLevel = findCurrentLevel(zones, lift, currentWeights);
        const nextLiftLevel = nextLevel(currentLevel);
        const { pounds, sessions } = distanceToLevel(zones, nextLiftLevel, lift, currentWeights);
        return (
          <span key={lift}>
            {names[lift]}: {pounds} lbs ({sessions} {sessions === 1 ? 'session' : 'sessions'} without fail) until{' '}
            {nextLiftLevel}
          </span>
        );
      })}
    </div>
  );
};
