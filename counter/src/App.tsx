import React from 'react';
import './App.css';
import { useCounter } from './hooks/useCounter';
import { useSettings } from './hooks/useSettings';
import { CounterButton } from './components/CounterButton';
import { SettingsButton } from './components/SettingsButton';

const App: React.FC = () => {
  const { openDeathPopup, openCrashPopup } = useCounter();
  const { openSettingsPopup } = useSettings();

  return (
    <div>
      <CounterButton onClick={openDeathPopup} label="Contador de Muertes" />
      <CounterButton onClick={openCrashPopup} label="Contador de Crasheos" />
      <SettingsButton onClick={openSettingsPopup} label="Configurar Teclas" />
    </div>
  );
};

export default App;
