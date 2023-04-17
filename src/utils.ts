export const isNumber = (x: unknown): x is number => {
  return typeof x === 'number' && !isNaN(x);
};

export type OverrideDivProps<UniqueProps extends object> = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  keyof UniqueProps
> &
  UniqueProps;

export const combineStyles = (one: React.CSSProperties | undefined, two: React.CSSProperties): React.CSSProperties => {
  return { ...(one || {}), ...(two || {}) };
};
