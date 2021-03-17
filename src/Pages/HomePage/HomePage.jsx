import React, { useEffect, useState } from 'react';
import { subscribeSocket, unsubscribeSocket } from '../../Data/socket';
import ConnectionController from '../../Components/ConnectionController/ConnectionController';

let count = 0;
const STOP_CONNECTION_AFTER = 10;

function HomePage() {
  const [isSocketConnected, setIsSocketConnected] = useState(true);

  const startSocketConnection = () => {
    subscribeSocket(data => {
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
