import React, { useState } from 'react';

interface CounterPopupProps {
  title: string;
  initialCount: number;
  imageSrc: string;
  onUpdate: (newCount: number) => void; // Función para actualizar el contador principal
}

const CounterPopup: React.FC<CounterPopupProps> = ({ title, initialCount, imageSrc, onUpdate }) => {
  const [count, setCount] = useState<number>(initialCount);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onUpdate(newCount); // Actualiza el contador principal
  };

  const decrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      onUpdate(newCount); // Actualiza el contador principal
    }
  };

  const closePopup = () => {
    window.close();
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#121212', color: 'white' }}>
      <h2>{title}</h2>
      <img src={imageSrc} alt={title} style={{ width: 200, height: 'auto', marginBottom: 20 }} />
      <p>Contador: {count}</p>
      <button onClick={increment} style={{ padding: '10px 20px', margin: '5px', backgroundColor: '#007bff', color: 'white' }}>
        Aumentar
      </button>
      <button
        onClick={decrement}
        style={{ padding: '10px 20px', margin: '5px', backgroundColor: '#007bff', color: 'white' }}
        disabled={count === 0}
      >
        Disminuir
      </button>
      <button onClick={closePopup} style={{ padding: '10px 20px', margin: '5px', backgroundColor: 'red', color: 'white' }}>
        Cerrar
      </button>
    </div>
  );
};

export default CounterPopup;
