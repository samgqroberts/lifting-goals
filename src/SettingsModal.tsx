import React, { useState } from 'react';

import { Inputs } from './Inputs';
import { beginnerValuesFromNippard, Goal, LiftSlice, maximums, minimums, roundTo5 } from './Lifts';
import { Modal } from './Modal';
import { Ratios } from './Ratios';

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

export const SettingsModal: React.FC<{
  bodyWeight: number;
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
  settingsOpen: boolean;
  setSettingsOpen: (value: boolean) => void;
}> = ({ bodyWeight, goals, setGoals, settingsOpen, setSettingsOpen }) => {
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
  );
};
