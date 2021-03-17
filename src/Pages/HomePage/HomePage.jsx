import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { subscribeSocket, unsubscribeSocket } from '../../Data/socket';
import ConnectionController from '../../Components/ConnectionController/ConnectionController';
import parseSocketDataWithState from '../../Services/parseSocket';
import CityAirQualityIndexTable from '../../Components/CityAirQualityIndexTable/CityAirQualityIndexTable';
import CityAQIComparisonGraph from '../../Components/CityAQIComparisonGraph/CityAQIComparisonGraph';

let count = 0;
const STOP_CONNECTION_AFTER = 10;
const getConsumableData = parseSocketDataWithState();

function HomePage() {
  const [isSocketConnected, setIsSocketConnected] = useState(true);
  const [appState, setAppState] = useState({
    current: [],
    history: {},
  });

  const [selectedForComparison, setSelectedForComparison] = useState([]);

  const startSocketConnection = () => {
    console.log('start');
    subscribeSocket(data => {
      const { updatedAQIHistory, formattedCurrentAQI } = getConsumableData(data);
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
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid order={1} item xs={12} lg={5} container justify="center">
          <CityAirQualityIndexTable
            data={appState.current}
            selectedForComparison={selectedForComparison}
            setSelectedForComparison={setSelectedForComparison}
          />
          <ConnectionController
            state={isSocketConnected}
            toConnect={startSocketConnection}
            toDisconnect={stopSocketConnection}
          />
        </Grid>
        <Grid order={3} item xs={12} lg={4} container justify="center">
          <CityAQIComparisonGraph
            data={appState.history}
            selectedForComparison={selectedForComparison}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
