import { LiftSlice, roundTo5 } from './Lifts';

const percentify = (value: number) => `${(value * 100).toFixed(0)}%`;

const RatioRow: React.FC<{
  skipRight?: boolean;
  name: string;
  weight: number;
  proportionLeft: number | null;
  maxProportionLeft: number;
  proportionRight: number | null;
  maxProportionRight: number;
}> = ({ skipRight = false, name, weight, proportionLeft, maxProportionLeft, proportionRight, maxProportionRight }) => {
  const derivedProportionLeft = (proportionLeft === null ? 1 : proportionLeft) / maxProportionLeft;
  const derivedProportionRight = (proportionRight === null ? 1 : proportionRight) / maxProportionRight;
  const proportionLabelWidth = 36;
  const proportionLabelMargin = 3;
  return (
    <div style={{ display: 'flex' }}>
      {/* left */}
      <div style={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
        <span
          style={{
            width: proportionLabelWidth,
            textAlign: 'right',
            marginLeft: 'auto',
            marginRight: proportionLabelMargin,
          }}
        >
          {proportionLeft === null ? ' ' : percentify(proportionLeft)}
        </span>
        <div
          style={{
            height: proportionLeft === null ? '80%' : '65%',
            background: proportionLeft === null ? 'grey' : '#32a852',
            width: `${derivedProportionLeft * 70}%`,
          }}
        />
      </div>
      {/* middle */}
      <div
        style={{
          display: 'flex',
          width: 92,
          justifyContent: 'space-between',
          whiteSpace: 'nowrap',
          margin: '0 3px',
        }}
      >
        <span>{name}</span>
        <span>{weight} lb</span>
      </div>
      {/* right */}
      <div style={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
        <div
          style={{
            height: proportionRight === null ? '80%' : '65%',
            background: proportionRight === null ? 'grey' : '#666bff',
            width: `${derivedProportionRight * 70}%`,
            visibility: skipRight ? 'hidden' : 'inherit',
          }}
        />
        <span
          style={{
            width: proportionLabelWidth,
            marginRight: 'auto',
            visibility: skipRight ? 'hidden' : 'inherit',
            marginLeft: proportionLabelMargin,
          }}
        >
          {proportionRight === null ? ' ' : percentify(proportionRight)}
        </span>
      </div>
    </div>
  );
};

export const Ratios: React.FC<{
  bodyWeight: number;
  weights: LiftSlice;
  bodyWeightAsWeight?: boolean;
}> = ({ bodyWeight, weights, bodyWeightAsWeight = false }) => {
  const maxProportionLeft = Math.max(
    1,
    weights.squat / bodyWeight,
    weights.bp / bodyWeight,
    weights.row / bodyWeight,
    weights.ohp / bodyWeight,
    weights.dl / bodyWeight,
  );
  const maxProportionRight = Math.max(
    1,
    weights.bp / weights.squat,
    weights.row / weights.squat,
    weights.ohp / weights.squat,
    weights.dl / weights.squat,
  );
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: 12,
        padding: '0px 10px',
      }}
    >
      <RatioRow
        skipRight
        name="Weight"
        weight={bodyWeight}
        proportionLeft={null}
        proportionRight={null}
        {...{ maxProportionLeft, maxProportionRight }}
      />
      <RatioRow
        name="Squat"
        weight={weights.squat}
        proportionLeft={bodyWeightAsWeight ? roundTo5(weights.squat * bodyWeight) : weights.squat / bodyWeight}
        proportionRight={null}
        {...{ maxProportionLeft, maxProportionRight }}
      />
      <RatioRow
        name="Bench"
        weight={weights.bp}
        proportionLeft={bodyWeightAsWeight ? roundTo5(weights.bp * bodyWeight) : weights.bp / bodyWeight}
        proportionRight={weights.bp / weights.squat}
        {...{ maxProportionLeft, maxProportionRight }}
      />
      <RatioRow
        name="Row"
        weight={weights.row}
        proportionLeft={bodyWeightAsWeight ? roundTo5(weights.row * bodyWeight) : weights.row / bodyWeight}
        proportionRight={weights.row / weights.squat}
        {...{ maxProportionLeft, maxProportionRight }}
      />
      <RatioRow
        name="OHP"
        weight={weights.ohp}
        proportionLeft={bodyWeightAsWeight ? roundTo5(weights.ohp * bodyWeight) : weights.ohp / bodyWeight}
        proportionRight={weights.ohp / weights.squat}
        {...{ maxProportionLeft, maxProportionRight }}
      />
      <RatioRow
        name="DL"
        weight={weights.dl}
        proportionLeft={bodyWeightAsWeight ? roundTo5(weights.dl * bodyWeight) : weights.dl / bodyWeight}
        proportionRight={weights.dl / weights.squat}
        {...{ maxProportionLeft, maxProportionRight }}
      />
    </div>
  );
};
