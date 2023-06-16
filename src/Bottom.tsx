import React, { ReactNode, useState } from 'react';

import { Inputs } from './Inputs';
import { beginnerValuesFromNippard, Goal, LiftSlice, maximums, minimums, roundTo5 } from './Lifts';
import { Portal } from './Portal';
import { Ratios } from './Ratios';
import { Red, White } from './styles';
import { combineStyles, ReactButtonProps } from './utils';

const Grey = '#777';
const iconSize = 24;

const IconButton: React.FC<ReactButtonProps> = ({ style: _style, ...props }) => {
  const style = combineStyles(
    {
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
    },
    _style,
  );
  return <button {...{ style }} {...props} />;
};

const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}> = ({ open, onClose, children }) => {
  return (
    <React.Fragment>
      {open && (
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
              onClick={() => onClose()}
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
              {children}
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
                  onClick={() => onClose()}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </React.Fragment>
  );
};

const newGoalNames = [
  'quadzilla',
  'biclops',
  'brodin',
  'swolezilla',
  'strong f kennedy',
  'shred zeppelin',
  'oh my quad',
];

const getNewGoalName = (usedNames: string[]): string => {
  const remainingNames = newGoalNames.filter((name) => !usedNames.includes(name));
  if (remainingNames.length > 0) {
    return remainingNames[Math.floor(Math.random() * remainingNames.length)];
  }
  let newName: string | null = null;
  for (let i = 1; !newName; i++) {
    const candidate = `Goal ${i}`;
    if (!usedNames.includes(candidate)) {
      newName = candidate;
    }
  }
  return newName;
};

export const Bottom: React.FC<{
  bodyWeight: number;
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
}> = ({ bodyWeight, goals, setGoals }) => {
  const [helpOpen, setHelpOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [draftGoals, setDraftGoals] = useState<Goal[]>(goals);
  const [selectedGoalName, setSelectedGoalName] = useState<string | null>(null);
  const selectedGoal = (selectedGoalName && draftGoals.find((g) => g.name === selectedGoalName)) || null;
  const updateSelectedGoal = (updates: Partial<Goal>) => {
    if (selectedGoal) {
      setDraftGoals(draftGoals.map((goal) => (goal.name === selectedGoal.name ? { ...goal, ...updates } : goal)));
    }
  };
  const updateSelectedGoalName = (name: string) => {
    updateSelectedGoal({ name });
    setSelectedGoalName(name);
  };
  return (
    <div style={{ display: 'flex', margin: '15px 0', padding: '0 15px' }}>
      <IconButton onClick={() => setHelpOpen(true)}>?</IconButton>
      <IconButton style={{ fontSize: 24, paddingBottom: 2, marginLeft: 10 }} onClick={() => setSettingsOpen(true)}>
        &#9881;
      </IconButton>
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
          <a href="https://stronglifts.com/5x5/">StrongLifts 5x5 workout plan</a>. However, this is NOT an official app
          of the StrongLifts brand.
        </div>
        <div style={{ marginTop: 'auto', padding: 15, paddingBottom: 5 }}>Created by samgqroberts</div>
      </Modal>
      <Modal open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <h4>Goals</h4>
        <ul>
          {draftGoals.map((goal) => {
            return (
              <li key={goal.name}>
                <button onClick={() => setSelectedGoalName(goal.name)}>{goal.name}</button>
              </li>
            );
          })}
        </ul>
        <button
          onClick={() => {
            const name = getNewGoalName(draftGoals.map((g) => g.name));
            setDraftGoals([
              ...draftGoals,
              {
                name,
                basedOnBodyWeight: false,
                values: { ...beginnerValuesFromNippard },
              },
            ]);
            setSelectedGoalName(name);
          }}
        >
          New Goal
        </button>
        {selectedGoal && (
          <div key={selectedGoal.name}>
            <input
              type="text"
              defaultValue={selectedGoal.name}
              onBlur={(e) => updateSelectedGoalName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
                  updateSelectedGoalName(e.target.value);
                }
              }}
            />
            <label htmlFor="basedonbodyweight">Based on Body Weight</label>
            <input
              id="basedonbodyweight"
              type="checkbox"
              defaultChecked={selectedGoal.basedOnBodyWeight}
              onChange={(e) => {
                if (selectedGoal.basedOnBodyWeight === e.target.checked) return;
                // update values to be the equivalents but as a proportion of body weight
                const newValues: LiftSlice = selectedGoal.basedOnBodyWeight
                  ? {
                      squat: roundTo5(bodyWeight * selectedGoal.values.squat),
                      bp: roundTo5(bodyWeight * selectedGoal.values.bp),
                      row: roundTo5(bodyWeight * selectedGoal.values.row),
                      ohp: roundTo5(bodyWeight * selectedGoal.values.ohp),
                      dl: roundTo5(bodyWeight * selectedGoal.values.dl),
                    }
                  : {
                      squat: Math.round((100 * selectedGoal.values.squat) / bodyWeight) / 100,
                      bp: Math.round((100 * selectedGoal.values.bp) / bodyWeight) / 100,
                      row: Math.round((100 * selectedGoal.values.row) / bodyWeight) / 100,
                      ohp: Math.round((100 * selectedGoal.values.ohp) / bodyWeight) / 100,
                      dl: Math.round((100 * selectedGoal.values.dl) / bodyWeight) / 100,
                    };
                updateSelectedGoal({ basedOnBodyWeight: e.target.checked, values: newValues });
              }}
            />
            <Ratios
              {...{ bodyWeight }}
              weights={selectedGoal.values}
              bodyWeightAsWeight={selectedGoal.basedOnBodyWeight}
            />
            <Inputs
              minimums={
                selectedGoal.basedOnBodyWeight
                  ? {
                      squat: 0.1,
                      bp: 0.1,
                      row: 0.1,
                      ohp: 0.1,
                      dl: 0.1,
                    }
                  : minimums
              }
              maximums={
                selectedGoal.basedOnBodyWeight
                  ? {
                      squat: 5,
                      bp: 4,
                      row: 4,
                      ohp: 3,
                      dl: 6,
                    }
                  : maximums
              }
              asRatio={selectedGoal.basedOnBodyWeight}
              currentSquat={selectedGoal.values.squat}
              currentBp={selectedGoal.values.bp}
              currentRow={selectedGoal.values.row}
              currentOhp={selectedGoal.values.ohp}
              currentDl={selectedGoal.values.dl}
              setCurrentSquat={(value) => updateSelectedGoal({ values: { ...selectedGoal.values, squat: value } })}
              setCurrentBp={(value) => updateSelectedGoal({ values: { ...selectedGoal.values, bp: value } })}
              setCurrentRow={(value) => updateSelectedGoal({ values: { ...selectedGoal.values, row: value } })}
              setCurrentOhp={(value) => updateSelectedGoal({ values: { ...selectedGoal.values, ohp: value } })}
              setCurrentDl={(value) => updateSelectedGoal({ values: { ...selectedGoal.values, dl: value } })}
            />
          </div>
        )}
        <button
          onClick={() => {
            setGoals(draftGoals);
          }}
        >
          Save
        </button>
      </Modal>
    </div>
  );
};
