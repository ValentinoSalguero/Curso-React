import React, { useState, useEffect } from 'react';
import './App.css'; // Para el contenido del componente principal

const App: React.FC = () => {
  const [deathCount, setDeathCount] = useState<number>(0);
  const [crashCount, setCrashCount] = useState<number>(0);
  const [deathPopup, setDeathPopup] = useState<Window | null>(null);
  const [crashPopup, setCrashPopup] = useState<Window | null>(null);

  useEffect(() => {
    const storedDeathCount = localStorage.getItem('deathCount');
    const storedCrashCount = localStorage.getItem('crashCount');
    
    if (storedDeathCount) {
      setDeathCount(Number(storedDeathCount));
    }
    
    if (storedCrashCount) {
      setCrashCount(Number(storedCrashCount));
    }
  }, []);

  // Función para abrir las ventanas emergentes
  const openCounterPopup = (
    title: string,
    initialCount: number,
    imageSrc: string,
    popupState: Window | null,
    setPopupState: React.Dispatch<React.SetStateAction<Window | null>>,
    counterType: 'death' | 'crash'
  ): void => {
    if (popupState && !popupState.closed) {
      popupState.focus();
      return;
    }

    const popup = window.open('', title, 'width=430,height=300');
    setPopupState(popup);

    if (popup) {
      popup.document.body.innerHTML = '';
      popup.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              /* Estilos específicos para la ventana emergente */
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
                background-color: transparent;
              }

              .counter-container {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 50px;
              }

              .popup-image {
                width: 100px;
                height: 100px;
                margin-right: 100px; /* Aumenté el margen entre la imagen y el número */
              }

              .popup-count {
                font-size: 90px;
                margin: 0;
              }

              .popup-btn {
                background-color: #4CAF50;
                color: white;
                padding: 10px 20px;
                border: none;
                margin: 5px;
                cursor: pointer;
                border-radius: 5px;
                font-size: 16px;
              }

              .popup-btn:hover {
                background-color: #45a049;
              }

              .popup-close-btn {
                background-color: #f44336;
              }

              .popup-close-btn:hover {
                background-color: #d32f2f;
              }

              /* Desactivar botón de decremento si el contador es 0 */
              .popup-btn:disabled {
                background-color: #ddd;
                cursor: not-allowed;
              }
            </style>
          </head>
          <body>
            <div class="counter-container">
              <img src="${imageSrc}" alt="${title}" class="popup-image" />
              <p id="count" class="popup-count">${initialCount}</p>
            </div>
            <button id="incrementBtn" class="popup-btn">Aumentar</button>
            <button id="decrementBtn" class="popup-btn">Disminuir</button>
            <button id="closeBtn" class="popup-btn popup-close-btn">Cerrar</button>

            <script>
              window.onload = function() {
                let count = ${initialCount};

                function updateCount() {
                  document.getElementById('count').innerText = count;
                  const decrementBtn = document.getElementById('decrementBtn');
                  decrementBtn.disabled = count === 0;
                }

                updateCount(); // Actualizamos el contador inicialmente

                document.getElementById('incrementBtn').onclick = function() {
                  count++;
                  updateCount();
                  window.opener.postMessage({ type: '${counterType}Increment', newCount: count }, '*');
                };

                document.getElementById('decrementBtn').onclick = function() {
                  if (count > 0) {
                    count--;
                    updateCount();
                    window.opener.postMessage({ type: '${counterType}Decrement', newCount: count }, '*');
                  }
                };

                document.getElementById('closeBtn').onclick = function() {
                  window.close();
                };
              }
            </script>
          </body>
        </html>
      `);
      popup.document.close();
    }
  };

  const handlePopupMessage = (event: MessageEvent): void => {
    if (event.data.type === 'deathIncrement' && event.data.newCount !== undefined) {
      setDeathCount(event.data.newCount);
      localStorage.setItem('deathCount', event.data.newCount.toString());
    } else if (event.data.type === 'deathDecrement' && event.data.newCount !== undefined) {
      setDeathCount(event.data.newCount);
      localStorage.setItem('deathCount', event.data.newCount.toString());
    } else if (event.data.type === 'crashIncrement' && event.data.newCount !== undefined) {
      setCrashCount(event.data.newCount);
      localStorage.setItem('crashCount', event.data.newCount.toString());
    } else if (event.data.type === 'crashDecrement' && event.data.newCount !== undefined) {
      setCrashCount(event.data.newCount);
      localStorage.setItem('crashCount', event.data.newCount.toString());
    }
  };

  useEffect(() => {
    window.addEventListener('message', handlePopupMessage);
    return () => {
      window.removeEventListener('message', handlePopupMessage);
    };
  }, []);

  const openDeathPopup = (): void => {
    openCounterPopup('Muertes', deathCount, '/skull.png', deathPopup, setDeathPopup, 'death');
  };

  const openCrashPopup = (): void => {
    openCounterPopup('Crasheos', crashCount, '/crash.png', crashPopup, setCrashPopup, 'crash');
  };

  return (
    <div className="app">
      <h1>Contadores</h1>
      <div className="menu">
        <button onClick={openDeathPopup}>Muertes</button>
        <button onClick={openCrashPopup}>Crasheos</button>
      </div>
    </div>
  );
};

export default App;
