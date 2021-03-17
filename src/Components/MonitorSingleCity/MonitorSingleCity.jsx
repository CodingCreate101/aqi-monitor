import React from 'react';
import {
  severityConditionedStyles,
  useStyles,
} from '../CityAirQualityIndexTable/CityAirQualityIndexTableStyles';

function MonitorSingleCity({ data }) {
  const classes = useStyles();

  const { city, aqi, dateTime } = data || {
    city: 'Select a city to monitor',
    aqi: [],
    dateTime: '',
  };

  const currentAQI = aqi.length ? aqi[aqi.length - 1] : false;

  const quality = severityConditionedStyles(currentAQI);

  return (
    <div
      style={{ justify: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}
      className={classes.root}
    >
      <h2>{city}</h2>
      {currentAQI ? (
        <>
          <h3 style={{ fontSize: '3.5rem' }} className={quality}>
            {currentAQI}
          </h3>

          <h3>Air Quality: {quality}</h3>
        </>
      ) : null}
    </div>
  );
}

export default MonitorSingleCity;
