import React from 'react';

import { Lift, LIFT_ORDER, LiftSlice, names, Threshold, Thresholds } from './Lifts';
import { colorForZoneIndex, Red } from './styles';

const getNextThreshold = (thresholds: Thresholds, lift: Lift, currentWeights: LiftSlice): Threshold | null => {
  return thresholds[lift].find((threshold) => currentWeights[lift] < threshold.value) || null;
};

const distanceToLevel = (
  lift: Lift,
  level: Threshold | null,
  currentWeights: LiftSlice,
): { pounds: number; sessions: number } | null => {
  if (!level) return null;
  const increasePerSessions = lift === 'dl' ? 10 : 5;
  const pounds = level.value - currentWeights[lift];
  const sessions = Math.ceil(pounds / increasePerSessions);
  return { pounds, sessions };
};

export const DistancesOld: React.FC<{ currentWeights: LiftSlice; thresholds: Thresholds }> = ({
  currentWeights,
  thresholds,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20, padding: '0 10px' }}>
      {LIFT_ORDER.map((lift) => {
        const nextLevel = getNextThreshold(thresholds, lift, currentWeights);
        const distance = distanceToLevel(lift, nextLevel, currentWeights);
        return (
          <span key={lift}>
            {distance &&
              nextLevel &&
              `${names[lift]}: ${distance.pounds} lb (${distance.sessions} ${
                distance.sessions === 1 ? 'session' : 'sessions'
              } without fail) until ${nextLevel.goalName}`}
          </span>
        );
      })}
    </div>
  );
};

const arrowheadHeight = 8;
const arrowheadLength = 20;
const arrowHeight = 4;
const arrowLength = 90;
const fontSize = 10;

export const Distance: React.FC<{ lift: Lift; thresholds: Thresholds; currentWeights: LiftSlice }> = ({
  lift,
  thresholds,
  currentWeights,
}) => {
  const nextLevel = getNextThreshold(thresholds, lift, currentWeights);
  const distance = distanceToLevel(lift, nextLevel, currentWeights);
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: 5, width: 45, textAlign: 'right' }}>{names[lift]}</span>
      <div
        style={{
          height: arrowHeight,
          position: 'relative',
          width: arrowLength + arrowheadLength,
          margin: '16px 0',
        }}
      >
        <div
          style={{
            height: arrowHeight,
            width: arrowLength,
            background: Red,
            position: 'relative',
            fontSize,
            fontWeight: 'bold',
          }}
        >
          <span style={{ position: 'absolute', top: -1.2 * fontSize, width: arrowLength, textAlign: 'center' }}>
            {distance && `${distance.pounds} lb`}
          </span>
          <span style={{ position: 'absolute', top: arrowHeight, width: arrowLength, textAlign: 'center' }}>
            {distance && `${distance.sessions} ${distance.sessions === 1 ? 'session' : 'sessions'}`}
          </span>
        </div>
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: `${arrowheadHeight}px solid transparent`,
            borderBottom: `${arrowheadHeight}px solid transparent`,
            borderLeft: `${arrowheadLength}px solid ${Red}`,
            position: 'absolute',
            right: 0,
            top: -arrowheadHeight + arrowHeight / 2,
          }}
        ></div>
      </div>
      <span
        style={{
          marginLeft: 5,
          borderBottom: nextLevel ? `4px solid ${colorForZoneIndex(nextLevel?.goalIndex)}` : 'none',
        }}
      >
        {nextLevel?.goalName}
      </span>
    </div>
  );
};

export const Distances: React.FC<{ currentWeights: LiftSlice; thresholds: Thresholds }> = ({
  currentWeights,
  thresholds,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0 10px',
        margin: '0 auto',
        marginTop: 12,
        fontWeight: 'bold',
        fontSize: 12,
      }}
    >
      {LIFT_ORDER.map((lift) => {
        return <Distance key={lift} {...{ lift, currentWeights, thresholds }} />;
      })}
    </div>
  );
};
