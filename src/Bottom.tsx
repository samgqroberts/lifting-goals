import React, { useEffect, useState } from 'react';

import { HelpModal } from './HelpModal';
import { Goal } from './Lifts';
import { SettingsModal } from './SettingsModal';
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

export const Bottom: React.FC<{
  bodyWeight: number;
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  hasDismissedHelpModal: boolean;
  setHasDismissedHelpModal: (value: boolean) => void;
}> = ({ bodyWeight, goals, setGoals, hasDismissedHelpModal, setHasDismissedHelpModal }) => {
  const [helpOpen, setHelpOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  useEffect(() => {
    if (!hasDismissedHelpModal) {
      setHelpOpen(true);
    }
  }, [hasDismissedHelpModal]);
  return (
    <div style={{ display: 'flex', margin: '15px 0', padding: '0 15px' }}>
      <IconButton onClick={() => setHelpOpen(true)}>?</IconButton>
      <IconButton style={{ fontSize: 24, paddingBottom: 2, marginLeft: 10 }} onClick={() => setSettingsOpen(true)}>
        &#9881;
      </IconButton>
      <HelpModal
        setHelpOpen={(value) => {
          if (!value) {
            setHasDismissedHelpModal(true);
          }
          setHelpOpen(value);
        }}
        {...{ helpOpen }}
      />
      <SettingsModal {...{ bodyWeight, goals, setGoals, settingsOpen, setSettingsOpen }} />
    </div>
  );
};
