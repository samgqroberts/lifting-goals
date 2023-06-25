import { useRef } from 'react';

import { LiftSlice, roundTo5 } from './Lifts';
import { useContainerDimensions } from './useContainerDimensions';

const percentify = (value: number) => `${(value * 100).toFixed(0)}%`;

const Grey = '#968b8a';
const LightRed = '#db655e';
type Width = 'small' | 'medium' | 'goforit';

const RatioRow: React.FC<{
  skipRight?: boolean;
  name: string;
  weight: number;
  proportionLeft: number | null;
  maxProportionLeft: number;
  proportionRight: number | null;
  maxProportionRight: number;
  width: Width;
}> = ({
  skipRight = false,
  name,
  weight,
  proportionLeft,
  maxProportionLeft,
  proportionRight,
  maxProportionRight,
  width,
}) => {
  const derivedProportionLeft = (proportionLeft === null ? 1 : proportionLeft) / maxProportionLeft;
  const derivedProportionRight = (proportionRight === null ? 1 : proportionRight) / maxProportionRight;
  const proportionLabelWidth = width === 'small' ? 32 : width === 'medium' ? 36 : 40;
  const proportionLabelMargin = 3;
  const fontSize = width === 'small' ? 12 : width === 'medium' ? 14 : 16;
  const middleWidth = width === 'small' ? 82 : width === 'medium' ? 96 : 104;
  return (
    <div style={{ display: 'flex', fontSize }}>
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
            background: proportionLeft === null ? Grey : LightRed,
            width: `${derivedProportionLeft * 70}%`,
          }}
        />
      </div>
      {/* middle */}
      <div
        style={{
          display: 'flex',
          width: middleWidth,
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
            background: proportionRight === null ? Grey : LightRed,
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
  const componentRef = useRef<HTMLDivElement>(null);
  const { width: containerWidth } = useContainerDimensions(componentRef);
  const width: Width = containerWidth < 300 ? 'small' : containerWidth < 400 ? 'medium' : 'goforit';
  const weightsInLb: LiftSlice = bodyWeightAsWeight
    ? {
        squat: roundTo5(weights.squat * bodyWeight),
        bp: roundTo5(weights.bp * bodyWeight),
        row: roundTo5(weights.row * bodyWeight),
        ohp: roundTo5(weights.ohp * bodyWeight),
        dl: roundTo5(weights.dl * bodyWeight),
      }
    : weights;
  const maxProportionLeft = Math.max(
    1,
    weightsInLb.squat / bodyWeight,
    weightsInLb.bp / bodyWeight,
    weightsInLb.row / bodyWeight,
    weightsInLb.ohp / bodyWeight,
    weightsInLb.dl / bodyWeight,
  );
  const maxProportionRight = Math.max(
    1,
    weightsInLb.bp / weightsInLb.squat,
    weightsInLb.row / weightsInLb.squat,
    weightsInLb.ohp / weightsInLb.squat,
    weightsInLb.dl / weightsInLb.squat,
  );
  return (
    <div
      ref={componentRef}
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
        {...{ maxProportionLeft, maxProportionRight, width }}
      />
      <RatioRow
        name="Squat"
        weight={weightsInLb.squat}
        proportionLeft={weightsInLb.squat / bodyWeight}
        proportionRight={null}
        {...{ maxProportionLeft, maxProportionRight, width }}
      />
      <RatioRow
        name="Bench"
        weight={weightsInLb.bp}
        proportionLeft={weightsInLb.bp / bodyWeight}
        proportionRight={weightsInLb.bp / weightsInLb.squat}
        {...{ maxProportionLeft, maxProportionRight, width }}
      />
      <RatioRow
        name="Row"
        weight={weightsInLb.row}
        proportionLeft={weightsInLb.row / bodyWeight}
        proportionRight={weightsInLb.row / weightsInLb.squat}
        {...{ maxProportionLeft, maxProportionRight, width }}
      />
      <RatioRow
        name="OHP"
        weight={weightsInLb.ohp}
        proportionLeft={weightsInLb.ohp / bodyWeight}
        proportionRight={weightsInLb.ohp / weightsInLb.squat}
        {...{ maxProportionLeft, maxProportionRight, width }}
      />
      <RatioRow
        name="DL"
        weight={weightsInLb.dl}
        proportionLeft={weightsInLb.dl / bodyWeight}
        proportionRight={weightsInLb.dl / weightsInLb.squat}
        {...{ maxProportionLeft, maxProportionRight, width }}
      />
    </div>
  );
};
