export const isNumber = (x: unknown): x is number => {
  return typeof x === 'number' && !isNaN(x);
};

export const toDigit = (x: string): number | undefined => {
  if (x in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) {
    return parseInt(x);
  }
  return undefined;
};

export type ReactButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type OverrideDivProps<UniqueProps extends object> = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  keyof UniqueProps
> &
  UniqueProps;

export const combineStyles = (
  one: React.CSSProperties | undefined,
  two: React.CSSProperties | undefined,
): React.CSSProperties => {
  return { ...(one || {}), ...(two || {}) };
};
