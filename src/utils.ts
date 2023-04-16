export const isNumber = (x: unknown): x is number => {
  return typeof x === 'number' && !isNaN(x);
};