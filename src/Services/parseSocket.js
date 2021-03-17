//* Return a function with data, using closure
export default function currentAndUpdatedHistoryAQIWithState() {
  //* A map to keep track of all city data
  const historyMap = {};
  let requestCount = 0;
  const RESET_AT = 10;

  return current => {
    requestCount++;
    //* parse latest data from socket
    const currentList = current.map(item => ({
      ...item,
      aqi: item.aqi.toFixed(2),
      id: item.city,
      dateTime: new Date(),
    }));

    for (const [key, value] of Object.entries(historyMap)) {
      let oldList = value.aqi;
      historyMap[key] = { ...value, aqi: [...oldList, oldList[oldList.length - 1]] };
    }

    //* For each of new data item, update state
    currentList.forEach(item => {
      const { city, aqi } = item;

      if (historyMap.hasOwnProperty(city)) {
        let oldList = historyMap[city].aqi;
        oldList.pop();
        if (oldList.length > RESET_AT) {
          for (const [key, value] of Object.entries(historyMap)) {
            let oldList = value.aqi;

            if (oldList.length < 5) {
              const filler = new Array(5 - oldList.length).fill(oldList[oldList.length - 1]);
              historyMap[key] = { ...value, aqi: [...oldList, ...filler] };
            } else {
              oldList = oldList.slice(oldList.length - 5);
              historyMap[key] = { ...value, aqi: [...oldList] };
            }
          }
          requestCount = RESET_AT / 2;
        } else {
          historyMap[city] = { ...item, aqi: [...oldList, aqi] };
        }
      } else {
        const filler = new Array(requestCount).fill(0);
        historyMap[city] = { ...item, aqi: [...filler, aqi] };
      }
    });

    //* Get latest AQP of all cities so far
    const latestData = Object.values(historyMap).map(item => {
      return {
        ...item,
        aqi: item.aqi[item.aqi.length - 1],
      };
    });

    return { updatedAQIHistory: historyMap, formattedCurrentAQI: latestData };
  };
}
