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
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
  hasVisited: boolean;
}> = ({ bodyWeight, goals, setGoals, hasVisited }) => {
  const [helpOpen, setHelpOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  useEffect(() => {
    if (!hasVisited) {
      setHelpOpen(true);
    }
  }, [hasVisited]);
  return (
    <div style={{ display: 'flex', margin: '15px 0', padding: '0 15px' }}>
      <IconButton onClick={() => setHelpOpen(true)}>?</IconButton>
      <IconButton style={{ fontSize: 24, paddingBottom: 2, marginLeft: 10 }} onClick={() => setSettingsOpen(true)}>
        &#9881;
      </IconButton>
      <HelpModal {...{ helpOpen, setHelpOpen }} />
      <SettingsModal {...{ bodyWeight, goals, setGoals, settingsOpen, setSettingsOpen }} />
    </div>
  );
};
