import React, { useEffect, useState, useCallback } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { subscribeSocket, unsubscribeSocket } from '../../Data/socket';
import ConnectionController from '../../Components/ConnectionController/ConnectionController';
import parseSocketDataWithState from '../../Services/parseSocket';
import CityAirQualityIndexTable from '../../Components/CityAirQualityIndexTable/CityAirQualityIndexTable';
import CityAQIComparisonGraph from '../../Components/CityAQIComparisonGraph/CityAQIComparisonGraph';
import MonitorSingleCity from '../../Components/MonitorSingleCity/MonitorSingleCity';
import useStyles from './HomePageStyles';
import MoreDetails from '../../Components/MoreDetails/MoreDetails';

let count = 0;
const STOP_CONNECTION_AFTER = 10;
const getConsumableData = parseSocketDataWithState();

function HomePage() {
  const classes = useStyles();
  const [isSocketConnected, setIsSocketConnected] = useState(true);
  const [appState, setAppState] = useState({
    current: [],
    history: {},
  });

  const [selectedForComparison, setSelectedForComparison] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedSetSelectedForComparison = useCallback(setSelectedForComparison, []);

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
        <Grid item xs={12} lg={3} container justify="center" className={classes.singleCityView}>
          <MonitorSingleCity
            data={
              appState.history[
                selectedForComparison.length
                  ? selectedForComparison[selectedForComparison.length - 1]
                  : 0
              ]
            }
          />
        </Grid>
        <Grid order={1} item xs={12} lg={5} container justify="center">
          <MoreDetails />
          <CityAirQualityIndexTable
            data={appState.current}
            selectedForComparison={selectedForComparison}
            setSelectedForComparison={memoizedSetSelectedForComparison}
            className={classes.cityList}
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
            className={classes.comparisonGraphs}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
