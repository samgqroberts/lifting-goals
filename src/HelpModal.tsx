import React from 'react';

import { Modal } from './Modal';
import { Red, White } from './styles';

export const HelpModal: React.FC<{
  helpOpen: boolean;
  setHelpOpen: (value: boolean) => void;
}> = ({ helpOpen, setHelpOpen }) => {
  return (
    <Modal open={helpOpen} onClose={() => setHelpOpen(false)}>
      <h2
        style={{
          alignSelf: 'center',
          marginTop: 15,
          marginBottom: 5,
          backgroundColor: Red,
          color: White,
          borderRadius: 25,
          padding: '10px 15px',
        }}
      >
        5x5 Goals
      </h2>
      <h4 style={{ margin: 0, textAlign: 'center', marginBottom: 12 }}>By samgqroberts</h4>
      <div style={{ padding: '8px 15px', fontSize: 14 }}>
        This app offers a dashboard view of your 5x5 lifting progress. It helps to contextualize where you are in
        relation to goals you can set. It also helps to visualize comparisons of your exercise weights.
      </div>
      <div style={{ padding: '8px 15px', fontSize: 14 }}>
        Use the circular inputs on the bottom of your screen to set your current 5x5 data. Click or touch and drag to
        change values. Your data is stored locally in your browser.
      </div>
      <div style={{ padding: '8px 15px', fontSize: 14 }}>
        Default goal values have been set as a function of your body weight. Their proportions are derived from Jeff
        Nippard&apos;s excellent video{' '}
        <a href="https://www.youtube.com/watch?v=LrDJXIQ_-eg">How Strong Should You Be? (Noob To Freak)</a>, adjusted
        down by 80% to shift from one rep max to 5x5 values.
      </div>
      <div style={{ padding: '8px 15px', fontSize: 14 }}>
        Use the settings icon to update these goals and set your own.
      </div>
      <div style={{ padding: '8px 15px', fontSize: 14 }}>
        The workouts and values here are based on the{' '}
        <a href="https://stronglifts.com/5x5/">StrongLifts 5x5 workout plan</a>. However, this is NOT an official app of
        the StrongLifts brand.
      </div>
    </Modal>
  );
};
