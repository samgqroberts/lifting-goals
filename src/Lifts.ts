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

export const computeZones = (bw: number): Zones => {
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
      squat: roundTo5(1.25 * bw),
      bp: roundTo5(1 * bw),
      row: roundTo5(0.9 * bw),
      ohp: roundTo5(0.55 * bw),
      dl: roundTo5(1.5 * bw),
    },
    intermediate: {
      squat: roundTo5(1.75 * bw),
      bp: roundTo5(1.5 * bw),
      row: roundTo5(1.25 * bw),
      ohp: roundTo5(0.75 * bw),
      dl: roundTo5(2.25 * bw),
    },
    advanced: {
      squat: roundTo5(2.5 * bw),
      bp: roundTo5(2 * bw),
      row: roundTo5(1.75 * bw),
      ohp: roundTo5(1.05 * bw),
      dl: roundTo5(3 * bw),
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
