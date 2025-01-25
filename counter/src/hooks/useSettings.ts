import { useState } from 'react';

export const useSettings = () => {
  const [settingsPopup, setSettingsPopup] = useState<Window | null>(null);

  const openSettingsPopup = () => {
    if (settingsPopup && !settingsPopup.closed) {
      settingsPopup.focus();
      return;
    }

    const popup = window.open('', 'Configuración', 'width=430,height=300');
    setSettingsPopup(popup);

    if (popup) {
      popup.document.body.innerHTML = '';
      popup.document.write(`
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
                background-color: #121212;
                color: white;
                overflow: hidden; /* Hide scrollbars */
              }
              button {
                padding: 5px 10px;
                margin: 0 5px;
                font-size: 12px;
                cursor: pointer;
                border: 2px solid transparent;
                border-radius: 5px;
                background-color: grey;
                transition: background-color 0.3s, border-color 0.3s;
              }
            </style>
          </head>
          <body>
            <p>Botón para aumentar: <button id="increaseBtn">ArrowUp</button></p>
            <p>Botón para disminuir: <button id="decreaseBtn">ArrowDown</button></p>
            <p>Botón para cerrar: <button id="closeBtn">Escape</button></p>
            <script>
              function assignKey(buttonId, action) {
                const button = document.getElementById(buttonId);
                button.textContent = 'Presiona una tecla para asignar (' + action + ')';
                function handleKeyPress(event) {
                  const keyName = event.key;
                  button.textContent = action + ': ' + keyName;
                  document.removeEventListener('keydown', handleKeyPress);
                  window.opener.postMessage({ type: 'set' + action + 'Key', key: keyName }, '*');
                }
                document.addEventListener('keydown', handleKeyPress);
              }
              document.getElementById('increaseBtn').onclick = () => assignKey('increaseBtn', 'Increase');
              document.getElementById('decreaseBtn').onclick = () => assignKey('decreaseBtn', 'Decrease');
              document.getElementById('closeBtn').onclick = () => assignKey('closeBtn', 'Close');
            </script>
          </body>
        </html>
      `);
      popup.document.close();
    }
  };

  return {
    openSettingsPopup,
  };
};
