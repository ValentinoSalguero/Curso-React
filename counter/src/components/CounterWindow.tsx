import React from "react";

interface CounterWindowProps {
  type: string;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  closeWindow: () => void;
}

const CounterWindow: React.FC<CounterWindowProps> = ({ type, count, setCount, closeWindow }) => {
  const incrementCount = () => setCount(count + 1);

  return (
    <div className="counter-window">
      <h2>{type === "muertes" ? "Contador de Muertes" : "Contador de Crasheos"}</h2>
      <p>Contador: {count}</p>
      <button onClick={incrementCount}>Incrementar</button>
      <button onClick={closeWindow}>Cerrar</button>
    </div>
  );
};

export default CounterWindow;
