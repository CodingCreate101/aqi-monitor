import React from 'react';
import Button from '@material-ui/core/Button';

function ConnectionController({ state, toConnect, toDisconnect }) {
  if (state) {
    return (
      <div className="connectionState">
        <div className="green">Receiving updates - stops automatically after 15 requests</div>
        <Button variant="contained" color="secondary" onClick={toDisconnect}>
          Stop
        </Button>
      </div>
    );
  }

  return (
    <div className="connectionState">
      <div className="red">Stopped receiving updates</div>

      <Button variant="contained" color="primary" onClick={toConnect}>
        Connect
      </Button>
    </div>
  );
}

export default ConnectionController;
