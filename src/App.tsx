import { Fragment, useEffect, useState } from 'react';
import './App.css';

type Lift = 'squat' | 'bp' | 'row' | 'ohp' | 'dl'

const LIFT_ORDER = [
  'squat',
  'bp',
  'row',
  'ohp',
  'dl',
] as const;

interface LiftSlice {
  squat: number,
  bp: number,
  row: number,
  ohp: number,
  dl: number
}

interface Zones {
  min: LiftSlice,
  noob: LiftSlice,
  beginner: LiftSlice,
  intermediate: LiftSlice
  advanced: LiftSlice
}

const roundTo5 = (value: number): number => {
  return Math.round(value / 5) * 5
}

const computeZones = (bw: number): Zones => {
  return {
    'min': {
      'squat': 45,
      'bp': 45,
      'row': 45,
      'ohp': 45,
      'dl': 45
    },
    'noob': {
      'squat': 135,
      'bp': 95,
      'row': 90,
      'ohp': 60,
      'dl': 135,
    },
    'beginner': {
      'squat': roundTo5(1.25 * bw),
      'bp': roundTo5(1 * bw),
      'row': roundTo5(0.9 * bw),
      'ohp': roundTo5(0.55 * bw),
      'dl': roundTo5(1.5 * bw),
    },
    'intermediate': {
      'squat': roundTo5(1.75 * bw),
      'bp': roundTo5(1.5 * bw),
      'row': roundTo5(1.25 * bw),
      'ohp': roundTo5(0.75 * bw),
      'dl': roundTo5(2.25 * bw)
    },
    'advanced': {
      'squat': roundTo5(2.5 * bw),
      'bp': roundTo5(2 * bw),
      'row': roundTo5(1.75 * bw),
      'ohp': roundTo5(1.05 * bw),
      'dl': roundTo5(3 * bw),
    },
  }
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

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

const Row: React.FC<{zones: Zones, currentWeights: LiftSlice, lift: Lift}> = ({ zones, currentWeights, lift }) => {
  const { width: windowWidth } = useWindowDimensions();
  const min = zones.min[lift];
  const max = zones.advanced[lift];
  const ticks = Array.from(new Array(1 + (Math.max(max - min, 0)) / 5), (x, i) => i).map(x => min + x * 5)
  const labelWidth = 50;
  const labelMargin = 5;
  const lineMargin = 5;
  const lineWidth = windowWidth - labelWidth - lineMargin;
  const tickSpan = lineWidth / ticks.length;
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
      marginLeft: labelMargin,
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
              borderTop: '10px solid #f00',
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

function App() {
  let [bodyWeight, setBodyWeight] = useState(190);
  bodyWeight = Math.max(bodyWeight ? bodyWeight : 0, 0)
  const zones = computeZones(bodyWeight)
  let [currentSquat, setCurrentSquat] = useState(zones.noob.squat);
  let [currentBp, setCurrentBp] = useState(zones.noob.bp);
  let [currentRow, setCurrentRow] = useState(zones.noob.row);
  let [currentOhp, setCurrentOhp] = useState(zones.noob.ohp);
  let [currentDl, setCurrentDl] = useState(zones.noob.dl);
  const currentWeights: LiftSlice = {
    squat: currentSquat,
    bp: currentBp,
    row: currentRow,
    ohp: currentOhp,
    dl: currentDl
  }
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontSize: 14,
    }}>
      <div style={{display: 'flex', overflow: 'none'}}>
        <label htmlFor="bodyweight">Body Weight</label>
        <input id='bodyWeight' value={bodyWeight} onChange={(e) => setBodyWeight(parseInt(e.target.value))}></input>
      </div>
      <div style={{display: 'flex', overflow: 'none'}}>
        <label htmlFor="currentSquat">Current Squat</label>
        <input id='currentSquat' value={currentSquat} onChange={(e) => setCurrentSquat(parseInt(e.target.value))}></input>
      </div>
      <div style={{display: 'flex', overflow: 'none'}}>
        <label htmlFor="currentBp">Current BP</label>
        <input id='currentBp' value={currentBp} onChange={(e) => setCurrentBp(parseInt(e.target.value))}></input>
      </div>
      <div style={{display: 'flex', overflow: 'none'}}>
        <label htmlFor="currentRow">Current Row</label>
        <input id='currentRow' value={currentRow} onChange={(e) => setCurrentRow(parseInt(e.target.value))}></input>
      </div>
      <div style={{display: 'flex', overflow: 'none'}}>
        <label htmlFor="currentOhp">Current OHP</label>
        <input id='currentOhp' value={currentOhp} onChange={(e) => setCurrentOhp(parseInt(e.target.value))}></input>
      </div>
      <div style={{display: 'flex', overflow: 'none'}}>
        <label htmlFor="currentDl">Current DL</label>
        <input id='currentDl' value={currentDl} onChange={(e) => setCurrentDl(parseInt(e.target.value))}></input>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {LIFT_ORDER.map(lift => (
          <Row key={lift} {...{zones, currentWeights, lift}} />
        ))}
      </div>
    </div>
  );
}

export default App;
