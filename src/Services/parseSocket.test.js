import parseSocketDataWithState from './parseSocket';
const getCurrentAndUpdatedHistoryAQI = parseSocketDataWithState();

const cityList = [
  {
    city: 'Mumbai',
    aqi: 300.625,
  },
  {
    city: 'Bengaluru',
    aqi: 400.098,
  },
  {
    city: 'Kolkata',
    aqi: 200.343,
  },
  {
    city: 'Bhubaneswar',
    aqi: 100.607,
  },
  {
    city: 'Chennai',
    aqi: 100.874,
  },
  {
    city: 'Pune',
    aqi: 200.415,
  },
  {
    city: 'Jaipur',
    aqi: 100.395,
  },
  {
    city: 'Chandigarh',
    aqi: 50.211,
  },
  {
    city: 'Lucknow',
    aqi: 100.337,
  },
];

describe('Parse Socket function', () => {
  test('Should return equal length history for random length input', () => {
    let data;
    const MOCK_ITERATION = 100;
    for (let index = 0; index < MOCK_ITERATION; index++) {
      const socketMock = cityList.slice(Math.random() * cityList.length);

      const { updatedAQIHistory, formattedCurrentAQI } = getCurrentAndUpdatedHistoryAQI(socketMock);

      if (index + 1 >= MOCK_ITERATION) {
        data = {
          updatedAQIHistory,
          formattedCurrentAQI,
        };
      }
    }
    const values = Object.values(data.updatedAQIHistory);
    const lengthOfAQIArray = values[0].aqi.length;

    values.forEach(item => {
      expect(item.aqi.length).toBe(lengthOfAQIArray);
    });
  });
});
