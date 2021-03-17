import React, { useEffect, useState } from 'react';

import {
  VictoryChart,
  VictoryTooltip,
  VictoryScatter,
  VictoryLine,
  VictoryGroup,
  VictoryVoronoiContainer,
} from 'victory';

// TODO: This probably requires optimization
//* Use useCallback and pass component through Memo

function CityAQIComparisonGraph({ data, selectedForComparison }) {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    if (selectedForComparison.length > 1) {
      const temp = selectedForComparison.map(item => {
        return data[item];
      });

      const graphicalData = temp.length
        ? temp.map(item =>
            item.aqi.map((dataPoint, index) => ({
              y: Number(dataPoint),
              x: index,
              city: item.city,
            }))
          )
        : [[], []];

      setGraphData(graphicalData);
    }
  }, [data, selectedForComparison]);

  if (selectedForComparison.length < 2) {
    return <h3>Select at least 2 cities to compare</h3>;
  }

  return (
    <>
      <VictoryChart height={400} width={400} containerComponent={<VictoryVoronoiContainer />}>
        {graphData.map(city => {
          return (
            <VictoryGroup
              key={city[0].city}
              color="#c43a31"
              labels={({ datum }) => `City: ${datum.city}, AQI: ${datum.y}`}
              labelComponent={<VictoryTooltip style={{ fontSize: 10 }} />}
              data={city}
            >
              <VictoryLine interpolation="natural" />
              <VictoryScatter size={({ active }) => (active ? 6 : 3)} />
            </VictoryGroup>
          );
        })}
      </VictoryChart>
      <div>Hover on lines for more details</div>
    </>
  );
}

export default CityAQIComparisonGraph;
