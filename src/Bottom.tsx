import React, { useState } from 'react';

import { Portal } from './Portal';
import { Red, White } from './styles';

const Grey = '#777';
const iconSize = 24;

export const Bottom: React.FC = () => {
  const [helpOpen, setHelpOpen] = useState<boolean>(false);
  return (
    <div style={{ display: 'flex', margin: '15px 0', padding: '0 15px' }}>
      <button
        style={{
          display: 'flex',
          padding: 0,
          height: iconSize,
          width: iconSize,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          border: `1px solid ${Grey}`,
          color: Grey,
          background: 'transparent',
        }}
        onClick={() => setHelpOpen(true)}
      >
        ?
      </button>
      <React.Fragment>
        {helpOpen && (
          <Portal className="modal-portal">
            {/* overall */}
            <div style={{ display: 'flex', position: 'fixed', left: 0, top: 0, right: 0, bottom: 0 }}>
              {/* backdrop */}
              <button
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  background: 'black',
                  opacity: 0.3,
                }}
                onClick={() => setHelpOpen(false)}
              />
              {/* content */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'absolute',
                  left: 30,
                  top: 30,
                  right: 30,
                  bottom: 30,
                  background: 'white',
                  borderRadius: 6,
                }}
              >
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
                  StrongLifts Goals
                </h2>
                <div style={{ padding: 15 }}>
                  A dashboard to view your lifting progress, in relation to relative milestones. Also helps to visualize
                  the ratios between your lifts.
                </div>
                <div style={{ padding: 15 }}>
                  Input your current StrongLifts data using the circular inputs on the bottom of your screen. Click or
                  touch and drag to change values. Your data is stored locally in your browser.
                </div>
                <div style={{ padding: 15 }}>
                  Goal values as a function of body weight are derived from Jeff Nippard's excellent video{' '}
                  <a href="https://www.youtube.com/watch?v=LrDJXIQ_-eg">How Strong Should You Be? (Noob To Freak)</a>,
                  adjusted down by 80% to shift from one rep max to 5x5 values.
                </div>
                <div style={{ padding: 15 }}>
                  The workouts and values here are based on the{' '}
                  <a href="https://stronglifts.com/5x5/">Stronglifts 5x5 workout plan</a>. However, this is NOT an
                  official app of the StrongLifts brand.
                </div>
                <div style={{ marginTop: 'auto', padding: 15, paddingBottom: 5 }}>Created by samgqroberts</div>
                <div style={{ display: 'flex', marginTop: 5, marginBottom: 15 }}>
                  <button
                    style={{
                      display: 'flex',
                      borderRadius: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: iconSize,
                      height: iconSize,
                      border: `1px solid ${Grey}`,
                      color: Grey,
                      background: 'transparent',
                      marginLeft: 'auto',
                      marginRight: 15,
                    }}
                    onClick={() => setHelpOpen(false)}
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          </Portal>
        )}
      </React.Fragment>
    </div>
  );
};
