import React, { useEffect, useState } from 'react';
import { subscribeSocket, unsubscribeSocket } from '../../Data/socket';
import ConnectionController from '../../Components/ConnectionController/ConnectionController';
import parseSocketDataWithState from '../../Services/parseSocket';

let count = 0;
const STOP_CONNECTION_AFTER = 10;

const getCurrentAndUpdatedHistoryAQI = parseSocketDataWithState();

function HomePage() {
  const [isSocketConnected, setIsSocketConnected] = useState(true);
  const [appState, setAppState] = useState({
    current: [],
    history: {},
  });

  const startSocketConnection = () => {
    subscribeSocket(data => {
      const { updatedAQIHistory, formattedCurrentAQI } = getCurrentAndUpdatedHistoryAQI(data);

      setAppState({ current: [...formattedCurrentAQI], history: { ...updatedAQIHistory } });

      if (count > STOP_CONNECTION_AFTER) {
        stopSocketConnection();
      } else {
        count++;
      }
    });
    setIsSocketConnected(true);
  };

  const stopSocketConnection = () => {
    unsubscribeSocket();
    count = 0;
    setIsSocketConnected(false);
  };

  useEffect(() => {
    startSocketConnection();
    return () => {
      unsubscribeSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h2>Home Page</h2>
      {isSocketConnected ? 'Connected' : 'Not connected'}
      <ConnectionController
        state={isSocketConnected}
        toConnect={startSocketConnection}
        toDisconnect={stopSocketConnection}
      />
    </div>
  );
}

export default HomePage;
