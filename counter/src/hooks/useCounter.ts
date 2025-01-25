import { useState, useEffect } from 'react';

export const useCounter = () => {
  const [deathCount, setDeathCount] = useState<number>(0);
  const [crashCount, setCrashCount] = useState<number>(0);
  const [deathPopup, setDeathPopup] = useState<Window | null>(null);
  const [crashPopup, setCrashPopup] = useState<Window | null>(null);

  const [increaseKey, setIncreaseKey] = useState<string>('ArrowUp');
  const [decreaseKey, setDecreaseKey] = useState<string>('ArrowDown');
  const [closeKey, setCloseKey] = useState<string>('Escape');

  useEffect(() => {
    const storedDeathCount = localStorage.getItem('deathCount');
    const storedCrashCount = localStorage.getItem('crashCount');

    if (storedDeathCount) setDeathCount(Number(storedDeathCount));
    if (storedCrashCount) setCrashCount(Number(storedCrashCount));
  }, []);

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

    const popup = window.open('', title, 'width=400,height=150');
    setPopupState(popup);

    if (popup) {
      popup.document.body.innerHTML = '';
      popup.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
                background-color: transparent;
                overflow: hidden;
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
                margin-right: 100px;
              }
              .popup-count {
                font-size: 90px;
                margin: 0;
                transition: color 0.3s ease;
              }
              .base-color {
                color: black;
              }
              .green {
                color: green;
              }
              .red {
                color: red;
              }
            </style>
          </head>
          <body>
            <div class="counter-container">
              <img src="${imageSrc}" alt="${title}" class="popup-image" />
              <p id="count" class="popup-count">${initialCount}</p>
            </div>
            <script>
              window.onload = function() {
                let count = ${initialCount};

                function updateCount() {
                  const countElement = document.getElementById('count');
                  countElement.innerText = count;

                  if (count > ${initialCount}) {
                    countElement.classList.add('green');
                    countElement.classList.remove('red');
                  } else if (count < ${initialCount}) {
                    countElement.classList.add('red');
                    countElement.classList.remove('green');
                  }

                  setTimeout(() => {
                    countElement.classList.remove('green', 'red');
                    countElement.classList.add('base-color');
                  }, 300);
                }

                updateCount();

                window.addEventListener('keydown', function(event) {
                  if (event.key === '${increaseKey}') {
                    count++;
                    updateCount();
                    window.opener.postMessage({ type: '${counterType}Increment', newCount: count }, '*');
                  } else if (event.key === '${decreaseKey}' && count > 0) {
                    count--;
                    updateCount();
                    window.opener.postMessage({ type: '${counterType}Decrement', newCount: count }, '*');
                  } else if (event.key === '${closeKey}') {
                    window.close();
                  }
                });
              }
            </script>
          </body>
        </html>
      `);
      popup.document.close();
    }
  };

  const handlePopupMessage = (event: MessageEvent): void => {
    const { type, newCount, key } = event.data;
    if (type === 'deathIncrement' && newCount !== undefined) {
      setDeathCount(newCount);
      localStorage.setItem('deathCount', newCount.toString());
    } else if (type === 'deathDecrement' && newCount !== undefined) {
      setDeathCount(newCount);
      localStorage.setItem('deathCount', newCount.toString());
    } else if (type === 'crashIncrement' && newCount !== undefined) {
      setCrashCount(newCount);
      localStorage.setItem('crashCount', newCount.toString());
    } else if (type === 'crashDecrement' && newCount !== undefined) {
      setCrashCount(newCount);
      localStorage.setItem('crashCount', newCount.toString());
    } else if (type === 'setIncreaseKey' && key) {
      setIncreaseKey(key);
    } else if (type === 'setDecreaseKey' && key) {
      setDecreaseKey(key);
    } else if (type === 'setCloseKey' && key) {
      setCloseKey(key);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handlePopupMessage);
    return () => {
      window.removeEventListener('message', handlePopupMessage);
    };
  }, []);

  const openDeathPopup = () => openCounterPopup('Muertes', deathCount, '/skull.png', deathPopup, setDeathPopup, 'death');
  const openCrashPopup = () => openCounterPopup('Crasheos', crashCount, '/crash.png', crashPopup, setCrashPopup, 'crash');

  return {
    deathCount,
    crashCount,
    openDeathPopup,
    openCrashPopup,
  };
};
