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
          backgroundColor: Red,
          color: White,
          borderRadius: 25,
          padding: '10px 15px',
        }}
      >
        5x5 Goals
      </h2>
      <div style={{ padding: 15 }}>
        A dashboard to view your lifting progress, in relation to relative milestones. Also helps to visualize the
        ratios between your lifts.
      </div>
      <div style={{ padding: 15 }}>
        Input your current 5x5 data using the circular inputs on the bottom of your screen. Click or touch and drag to
        change values. Your data is stored locally in your browser.
      </div>
      <div style={{ padding: 15 }}>
        Goal values as a function of body weight are derived from Jeff Nippard&apos;s excellent video{' '}
        <a href="https://www.youtube.com/watch?v=LrDJXIQ_-eg">How Strong Should You Be? (Noob To Freak)</a>, adjusted
        down by 80% to shift from one rep max to 5x5 values.
      </div>
      <div style={{ padding: 15 }}>
        For more information about ratios, check out <a href="https://symmetricstrength.com/">Symmetric Strength</a>.
      </div>
      <div style={{ padding: 15 }}>
        The workouts and values here are based on the{' '}
        <a href="https://stronglifts.com/5x5/">StrongLifts 5x5 workout plan</a>. However, this is NOT an official app of
        the StrongLifts brand.
      </div>
      <div style={{ marginTop: 'auto', padding: 15, paddingBottom: 5 }}>Created by samgqroberts</div>
    </Modal>
  );
};
