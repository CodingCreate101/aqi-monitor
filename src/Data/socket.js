let client;

const socket_URL = process.env.REACT_APP_SOCKET_URL || 'wss://city-ws.herokuapp.com/';

export const initiateSocketConnection = () => {
  client = new WebSocket(socket_URL);
};

export const subscribeSocket = callback => {
  if (!client || client.readyState === 3) {
    initiateSocketConnection();
  }

  client.onerror = event => {
    console.log('Connection Error');
  };

  client.onopen = event => {
    console.log('Connected');
  };

  client.onclose = event => {
    console.log('Closed');
  };

  client.onmessage = event => {
    return callback(JSON.parse(event.data));
  };
};

export const unsubscribeSocket = () => {
  if (!client) {
    return;
  }
  client.close();
};
