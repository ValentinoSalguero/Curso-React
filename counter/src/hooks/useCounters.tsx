import { useState, useEffect } from "react";

export const useCounters = () => {
  const [deathCount, setDeathCount] = useState(0);
  const [crashCount, setCrashCount] = useState(0);

  const incrementCounter = (option: "muertes" | "crasheos") => {
    if (option === "muertes") {
      setDeathCount((prev) => prev + 1);
    } else if (option === "crasheos") {
      setCrashCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" || event.key === "K") {
        // Si se presionó la tecla 'k', incrementamos los contadores según la opción
        incrementCounter("muertes");  // Incrementamos el contador de muertes
        incrementCounter("crasheos");  // Incrementamos el contador de crasheos
      }
    };

    // Agregar el evento de keydown
    window.addEventListener("keydown", handleKeyDown);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);  // El array de dependencias está vacío para que se ejecute una sola vez al montar el componente

  return { deathCount, crashCount, incrementCounter };
};
