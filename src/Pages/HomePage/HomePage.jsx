import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { subscribeSocket, unsubscribeSocket } from '../../Data/socket';
import ConnectionController from '../../Components/ConnectionController/ConnectionController';
import parseSocketDataWithState from '../../Services/parseSocket';
import CityAirQualityIndexTable from '../../Components/CityAirQualityIndexTable/CityAirQualityIndexTable';

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
    console.log('start');
    subscribeSocket(data => {
      const { updatedAQIHistory, formattedCurrentAQI } = getCurrentAndUpdatedHistoryAQI(data);

      console.log('On Message');

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
    <Container maxWidth="lg">
      <Grid container direction="row" justify="center" alignItems="center"></Grid>
      <Grid order={1} item xs={12} lg={12} container justify="center">
        <CityAirQualityIndexTable data={appState.current} />
      </Grid>
      <ConnectionController
        state={isSocketConnected}
        toConnect={startSocketConnection}
        toDisconnect={stopSocketConnection}
      />
    </Container>
  );
}

export default HomePage;
