import React, { useEffect, useState } from 'react';

import { Inputs } from './Inputs';
import { beginnerValuesFromNippard, Goal, LiftSlice, maximums, minimums, roundTo5 } from './Lifts';
import { Modal } from './Modal';
import { Ratios } from './Ratios';
import { Red, White } from './styles';

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

const MAX_NUM_GOALS = 4;

export const SettingsModal: React.FC<{
  bodyWeight: number;
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
  settingsOpen: boolean;
  setSettingsOpen: (value: boolean) => void;
}> = ({ bodyWeight, goals, setGoals, settingsOpen, setSettingsOpen }) => {
  // component state
  const [draftGoals, setDraftGoals] = useState<Goal[]>(goals);
  const [selectedGoalName, setSelectedGoalName] = useState<string | null>(null);
  useEffect(() => {
    if (settingsOpen) {
      // on open of the modal, whether first or subsequent time, ensure state is set to
      // prop value defaults
      setDraftGoals(goals);
      setSelectedGoalName(null);
    }
  }, [settingsOpen]);
  // derived state
  const selectedGoal = (selectedGoalName && draftGoals.find((g) => g.name === selectedGoalName)) || null;
  const newGoalDisabled = draftGoals.length >= MAX_NUM_GOALS;
  // state update helpers
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
    <Modal open={settingsOpen} onClose={() => setSettingsOpen(false)}>
      <div style={{ display: 'flex', padding: '0 8px 8px', flexDirection: 'column', flexGrow: 1 }}>
        <h3>Set goals</h3>
        <div style={{ padding: 0, margin: 0 }}>
          {draftGoals.map((goal) => {
            const selected = selectedGoalName === goal.name;
            return (
              <button
                key={goal.name}
                style={{
                  background: selected ? Red : 'transparent',
                  color: selected ? White : 'inherit',
                  fontWeight: 'bold',
                  border: `1px solid ${Red}`,
                  padding: '4px 10px',
                  margin: 4,
                  borderRadius: 4,
                }}
                onClick={() => setSelectedGoalName(goal.name)}
              >
                {goal.name}
              </button>
            );
          })}
          <button
            style={{
              background: newGoalDisabled ? '#777' : '#444',
              color: White,
              fontWeight: 'bold',
              border: `1px solid ${Red}`,
              padding: '4px 10px',
              margin: 4,
              borderRadius: 4,
            }}
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
            disabled={newGoalDisabled}
          >
            ＋ New Goal
          </button>
        </div>
        <hr style={{ border: 0, borderBottom: '1px solid #888', width: '100%' }} />
        {selectedGoal && (
          <>
            <div key={selectedGoal.name} style={{ marginTop: 4, flexGrow: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="goalname" style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 2 }}>
                  Goal name
                </label>
                <input
                  id="goalname"
                  type="text"
                  defaultValue={selectedGoal.name}
                  onBlur={(e) => updateSelectedGoalName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
                      updateSelectedGoalName(e.target.value);
                    }
                  }}
                />
              </div>
              <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="basedonbodyweight" style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 2 }}>
                  Based on Body Weight
                </label>
                <input
                  id="basedonbodyweight"
                  type="checkbox"
                  style={{ width: 18, height: 18, padding: 0, margin: 0 }}
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
              </div>
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
            <hr style={{ border: 0, borderBottom: '1px solid #888', width: '100%' }} />
          </>
        )}
        <button
          style={{
            background: '#444',
            color: White,
            fontWeight: 'bold',
            border: `1px solid ${Red}`,
            padding: '4px 10px',
            margin: 4,
            borderRadius: 4,
          }}
          onClick={() => {
            setGoals(draftGoals);
            setSettingsOpen(false);
          }}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};
