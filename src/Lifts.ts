import { boolean, Infer, number, object, string } from 'superstruct';

export type Lift = 'squat' | 'bp' | 'row' | 'ohp' | 'dl';

export const LIFT_ORDER = ['squat', 'bp', 'row', 'ohp', 'dl'] as const;

export const LiftSlice = object({
  squat: number(),
  bp: number(),
  row: number(),
  ohp: number(),
  dl: number(),
});
export type LiftSlice = Infer<typeof LiftSlice>;

export interface Zones {
  min: LiftSlice;
  noob: LiftSlice;
  beginner: LiftSlice;
  intermediate: LiftSlice;
  advanced: LiftSlice;
}

export const roundTo5 = (value: number): number => {
  return Math.round(value / 5) * 5;
};

export const minimums = {
  squat: 45,
  bp: 45,
  row: 45,
  ohp: 45,
  dl: 45,
} as const;

export const maximums = {
  squat: 600,
  bp: 400,
  row: 400,
  ohp: 280,
  dl: 800,
} as const;

export const beginnerValuesFromNippard = {
  squat: 135,
  bp: 95,
  row: 90,
  ohp: 60,
  dl: 135,
} as const;

const ormBwRatiosFromNippard = {
  intermediate: {
    squat: 1.25,
    bp: 1,
    row: 0.9,
    ohp: 0.55,
    dl: 1.5,
  },
  advanced: {
    squat: 1.75,
    bp: 1.5,
    row: 1.25,
    ohp: 0.75,
    dl: 2.25,
  },
  freak: {
    squat: 2.5,
    bp: 2,
    row: 1.75,
    ohp: 1.05,
    dl: 3,
  },
} as const;

const to5x5FromOrm = (ormWeight: number): number => {
  return ormWeight * 0.8;
};

const computeFromRatio = (bw: number, ratio: number, orm = true): number => {
  let value = bw * ratio;
  if (!orm) {
    value = to5x5FromOrm(value);
  }
  return roundTo5(value);
};

export const Goal = object({
  name: string(),
  basedOnBodyWeight: boolean(),
  values: LiftSlice,
});
export type Goal = Infer<typeof Goal>;

export const NIPPARD_GOALS: Goal[] = [
  {
    name: 'beginner',
    basedOnBodyWeight: false,
    values: beginnerValuesFromNippard,
  },
  {
    name: 'intermediate',
    basedOnBodyWeight: true,
    values: ormBwRatiosFromNippard.intermediate,
  },
  {
    name: 'advanced',
    basedOnBodyWeight: true,
    values: ormBwRatiosFromNippard.advanced,
  },
  {
    name: 'max',
    basedOnBodyWeight: true,
    values: ormBwRatiosFromNippard.freak,
  },
];

export interface Threshold {
  goalName: string;
  value: number;
  goalIndex: number;
}

export interface Thresholds {
  squat: Threshold[];
  bp: Threshold[];
  row: Threshold[];
  ohp: Threshold[];
  dl: Threshold[];
}

export const computeThresholds = (goals: Goal[], bw: number, orm = false): Thresholds => {
  const result: Thresholds = { squat: [], bp: [], row: [], ohp: [], dl: [] };
  LIFT_ORDER.forEach((lift) => {
    const thresholds: Threshold[] = goals
      .map((goal, index) => {
        let value = goal.values[lift];
        if (goal.basedOnBodyWeight) {
          value = computeFromRatio(bw, value, orm);
        }
        return { goalName: goal.name, value, goalIndex: index };
      })
      .sort((a, b) => a.value - b.value);
    result[lift] = thresholds;
  });
  return result;
};

export const computeZones = (bw: number, orm = false): Zones => {
  return {
    min: {
      squat: 45,
      bp: 45,
      row: 45,
      ohp: 45,
      dl: 45,
    },
    noob: {
      squat: 135,
      bp: 95,
      row: 90,
      ohp: 60,
      dl: 135,
    },
    beginner: {
      squat: computeFromRatio(bw, ormBwRatiosFromNippard.intermediate.squat, orm),
      bp: computeFromRatio(bw, ormBwRatiosFromNippard.intermediate.bp, orm),
      row: computeFromRatio(bw, ormBwRatiosFromNippard.intermediate.row, orm),
      ohp: computeFromRatio(bw, ormBwRatiosFromNippard.intermediate.ohp, orm),
      dl: computeFromRatio(bw, ormBwRatiosFromNippard.intermediate.dl, orm),
    },
    intermediate: {
      squat: computeFromRatio(bw, ormBwRatiosFromNippard.advanced.squat, orm),
      bp: computeFromRatio(bw, ormBwRatiosFromNippard.advanced.bp, orm),
      row: computeFromRatio(bw, ormBwRatiosFromNippard.advanced.row, orm),
      ohp: computeFromRatio(bw, ormBwRatiosFromNippard.advanced.ohp, orm),
      dl: computeFromRatio(bw, ormBwRatiosFromNippard.advanced.dl, orm),
    },
    advanced: {
      squat: computeFromRatio(bw, ormBwRatiosFromNippard.freak.squat, orm),
      bp: computeFromRatio(bw, ormBwRatiosFromNippard.freak.bp, orm),
      row: computeFromRatio(bw, ormBwRatiosFromNippard.freak.row, orm),
      ohp: computeFromRatio(bw, ormBwRatiosFromNippard.freak.ohp, orm),
      dl: computeFromRatio(bw, ormBwRatiosFromNippard.freak.dl, orm),
    },
  };
};

export const names = {
  squat: 'Squat',
  bp: 'Bench',
  row: 'Row',
  ohp: 'OHP',
  dl: 'DL',
} as const;
