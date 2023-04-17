import { Fragment } from "react";
import { Lift, LiftSlice, Zones } from "./Lifts";
import { useWindowDimensions } from "./useWindowDimensions";
import { Red } from "./styles";

const names = {
  squat: 'Squat',
  bp: 'Bench',
  row: 'Row',
  ohp: 'OHP',
  dl: 'DL'
} as const;

const colors = {
  noob: '#d63865',
  beginner: '#4350af',
  intermediate: '#d1dc59',
  advanced: '#e15141'
} as const;

export const Row: React.FC<{zones: Zones, currentWeights: LiftSlice, lift: Lift}> = ({ zones, currentWeights, lift }) => {
  const { width: windowWidth } = useWindowDimensions();
  const min = zones.min[lift];
  const max = zones.advanced[lift];
  const ticks = Array.from(new Array(1 + (Math.max(max - min, 0)) / 5), (x, i) => i).map(x => min + x * 5)
  const labelWidth = 50;
  const labelMarginLeft = 5;
  const lineMarginRight = 10;
  const lineWidth = windowWidth - labelWidth - lineMarginRight;
  const tickSpan = lineWidth / (ticks.length - 1); // the extra 1 would dangle after the max
  const tickWidth = 1.5;
  return <div style={{
    display: 'flex',
    alignItems: 'center',
    height: 32
  }}>
    <div style={{
      width: labelWidth,
      overflow: 'hidden',
      whiteSpace: 'pre',
      fontSize: 12,
      fontWeight: 'bold',
      marginLeft: labelMarginLeft,
    }}>{names[lift]}</div>
    <div style={{
      position: 'absolute',
      background: 'lightgrey',
      width: lineWidth,
      height: 4,
      marginLeft: labelWidth
    }}>
      {ticks.map((tick, i) => {
        const color = tick < zones.noob[lift] ? colors.noob : tick < zones.beginner[lift] ? colors.beginner : tick < zones.intermediate[lift] ? colors.intermediate : colors.advanced;
        const indicator = [zones.min[lift], zones.noob[lift], zones.beginner[lift], zones.intermediate[lift], zones.advanced[lift]].includes(tick)
        return <Fragment key={tick}>
          <div key={tick} style={{
            position: 'absolute',
            height: indicator ? 12 : 8,
            top: -2,
            left: i * tickSpan,
            width: tickWidth,
            background: color
          }}></div>
          {(currentWeights[lift] > tick - 2.5 && currentWeights[lift] < tick + 2.5) && (
            <div style={{
              position: 'absolute',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: `10px solid ${Red}`,
              left: i * tickSpan - 5,
              top: -10
            }}/>
          )}
          {indicator && (
            <div style={{
              position: 'absolute',
              top: 9,
              left: i * tickSpan - (30 / 2),
              width: 30,
              textAlign: 'center',
              fontSize: 9
            }}>{tick}</div>
          )}
        </Fragment>
      })}
    </div>
  </div>
}
