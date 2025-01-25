import React from 'react';

interface SettingsButtonProps {
  onClick: () => void;
  label: string;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick, label }) => {
  return <button onClick={onClick}>{label}</button>;
};
