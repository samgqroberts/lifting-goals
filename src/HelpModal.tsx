import React, { ReactNode } from 'react';

import { Modal } from './Modal';
import { Red, White } from './styles';

const Paragraph: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div style={{ padding: '8px 15px', fontSize: 14 }}>{children}</div>;
};

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
      <h4 style={{ margin: 0, textAlign: 'center', marginBottom: 12 }}>
        By <a href="http://samgqroberts.com">samgqroberts</a>
      </h4>
      <Paragraph>
        This app offers <b>goal-oriented contexualization</b> of your <a href="https://stronglifts.com/">5x5</a> lifting
        progress.
      </Paragraph>
      <Paragraph>
        This app is not meant as a day-to-day workout tracker, like the{' '}
        <a href="https://stronglifts.com/#app">StrongLifts 5x5 app</a>. It is meant to <b>complement</b> that
        functionality by offering something in addition: setting goals, and tracking your progress towards those goals.
      </Paragraph>
      <Paragraph>
        <b>To start</b>, use the red circular inputs on the bottom of the page to set your <b>current 5x5 data</b>,
        including your current bodyweight. To set these values more easily, <b>swipe over the inputs</b>. Your data will
        be stored locally in your browser.
      </Paragraph>
      <Paragraph>
        The rest of the display will update to show how those values line up with various <b>goal weights</b>.
        Currently, a set of <b>default</b> goals are programmed in. These default goals have been derived from Jeff
        Nippard&apos;s excellent video{' '}
        <a href="https://www.youtube.com/watch?v=LrDJXIQ_-eg">How Strong Should You Be? (Noob To Freak)</a>, adjusted
        down by 80% to shift from one rep max to 5x5 values.
      </Paragraph>
      <Paragraph>
        To update these goals to your own personal targets, use the <b>settings icon</b> on the bottom of the page.
        There you can add, delete, rename, and set the values of goals.
      </Paragraph>
      <Paragraph>
        Please note: the workouts and values here are based on the{' '}
        <a href="https://stronglifts.com/5x5/">StrongLifts 5x5 workout plan</a>. However, this is <b>not</b> an official
        app of the StrongLifts brand.
      </Paragraph>
      <Paragraph>
        To read more about the motivation behind this project, read{' '}
        <a href="https://samgqroberts.com">this blog post</a>.
      </Paragraph>
    </Modal>
  );
};
