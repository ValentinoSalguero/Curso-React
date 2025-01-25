import React from 'react';

interface CounterButtonProps {
  onClick: () => void;
  label: string;
}

export const CounterButton: React.FC<CounterButtonProps> = ({ onClick, label }) => {
  return <button onClick={onClick}>{label}</button>;
};
