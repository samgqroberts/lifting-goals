export type Lift = 'squat' | 'bp' | 'row' | 'ohp' | 'dl';

export const LIFT_ORDER = ['squat', 'bp', 'row', 'ohp', 'dl'] as const;

export interface LiftSlice {
  squat: number;
  bp: number;
  row: number;
  ohp: number;
  dl: number;
}

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

const ormBwRatiosFromNippard = {
  beginner: {
    squat: 1.25,
    bp: 1,
    row: 0.9,
    ohp: 0.55,
    dl: 1.5,
  },
  intermediate: {
    squat: 1.75,
    bp: 1.5,
    row: 1.25,
    ohp: 0.75,
    dl: 2.25,
  },
  advanced: {
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
      squat: computeFromRatio(bw, ormBwRatiosFromNippard.beginner.squat, orm),
      bp: computeFromRatio(bw, ormBwRatiosFromNippard.beginner.bp, orm),
      row: computeFromRatio(bw, ormBwRatiosFromNippard.beginner.row, orm),
      ohp: computeFromRatio(bw, ormBwRatiosFromNippard.beginner.ohp, orm),
      dl: computeFromRatio(bw, ormBwRatiosFromNippard.beginner.dl, orm),
    },
    intermediate: {
      squat: computeFromRatio(bw, ormBwRatiosFromNippard.intermediate.squat, orm),
      bp: computeFromRatio(bw, ormBwRatiosFromNippard.intermediate.bp, orm),
      row: computeFromRatio(bw, ormBwRatiosFromNippard.intermediate.row, orm),
      ohp: computeFromRatio(bw, ormBwRatiosFromNippard.intermediate.ohp, orm),
      dl: computeFromRatio(bw, ormBwRatiosFromNippard.intermediate.dl, orm),
    },
    advanced: {
      squat: computeFromRatio(bw, ormBwRatiosFromNippard.advanced.squat, orm),
      bp: computeFromRatio(bw, ormBwRatiosFromNippard.advanced.bp, orm),
      row: computeFromRatio(bw, ormBwRatiosFromNippard.advanced.row, orm),
      ohp: computeFromRatio(bw, ormBwRatiosFromNippard.advanced.ohp, orm),
      dl: computeFromRatio(bw, ormBwRatiosFromNippard.advanced.dl, orm),
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
