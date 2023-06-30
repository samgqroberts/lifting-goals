import { Fragment, useRef } from 'react';

import { Lift, LIFT_ORDER, LiftSlice, minimums, names, Thresholds } from './Lifts';
import { colorForZoneIndex, Red } from './styles';
import { useContainerDimensions } from './useContainerDimensions';

const Row: React.FC<{ thresholds: Thresholds; currentWeights: LiftSlice; lift: Lift }> = ({
  thresholds,
  currentWeights,
  lift,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { width: containerWidth } = useContainerDimensions(divRef);
  const min = minimums[lift];
  const defaultMax = thresholds[lift][thresholds[lift].length - 1].value;
  const max = Math.max(defaultMax, currentWeights[lift]);
  const ticks = Array.from(new Array(1 + Math.floor(Math.max(max - min, 0) / 5)), (x, i) => i).map((x) => min + x * 5);
  const labelWidth = 50;
  const labelMarginLeft = 5;
  const lineMarginRight = 14;
  const lineWidth = containerWidth - labelWidth - lineMarginRight;
  const tickSpan = lineWidth / (ticks.length - 1); // the extra 1 would dangle after the max
  const tickWidth = 1.5;
  return (
    <div
      ref={divRef}
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 32,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: labelWidth,
          overflow: 'hidden',
          whiteSpace: 'pre',
          fontSize: 12,
          fontWeight: 'bold',
          marginLeft: labelMarginLeft,
        }}
      >
        {names[lift]}
      </div>
      <div
        style={{
          position: 'absolute',
          background: 'lightgrey',
          width: lineWidth,
          height: 4,
          marginLeft: labelWidth,
        }}
      >
        {ticks.map((tick, i) => {
          const zoneIndex = thresholds[lift].find((threshold) => tick < threshold.value)?.goalIndex || 0;
          const color = colorForZoneIndex(zoneIndex);
          const indicator = [minimums[lift], ...thresholds[lift].map((threshold) => threshold.value)].includes(tick);
          return (
            <Fragment key={tick}>
              <div
                key={tick}
                style={{
                  position: 'absolute',
                  height: indicator ? 12 : 8,
                  top: -2,
                  left: i * tickSpan,
                  width: tickWidth,
                  background: color,
                }}
              ></div>
              {currentWeights[lift] > tick - 2.5 && currentWeights[lift] < tick + 2.5 && (
                <div
                  style={{
                    position: 'absolute',
                    width: 0,
                    height: 0,
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: `10px solid ${Red}`,
                    left: i * tickSpan - 5,
                    top: -10,
                  }}
                />
              )}
              {indicator && (
                <div
                  style={{
                    position: 'absolute',
                    top: 9,
                    left: i * tickSpan - 30 / 2,
                    width: 30,
                    textAlign: 'center',
                    fontSize: 9,
                  }}
                >
                  {tick}
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export const Sliders: React.FC<{ thresholds: Thresholds; currentWeights: LiftSlice }> = ({
  thresholds,
  currentWeights,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 6 }}>
      {LIFT_ORDER.map((lift) => (
        <Row key={lift} {...{ thresholds, currentWeights, lift }} />
      ))}
    </div>
  );
};
