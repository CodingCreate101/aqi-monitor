import React from 'react';
import Button from '@material-ui/core/Button';
import useStyles from './ConnectionControllerStyle';

function ConnectionController({ state, toConnect, toDisconnect }) {
  const classes = useStyles();
  if (state) {
    return (
      <div className={classes.connectionState}>
        <div className={classes.green}>
          Receiving updates - stops automatically after 15 requests
        </div>
        <Button variant="contained" color="secondary" onClick={toDisconnect}>
          Stop
        </Button>
      </div>
    );
  }

  return (
    <div className={classes.connectionState}>
      <div className={classes.red}>Stopped receiving updates</div>

      <Button variant="contained" color="primary" onClick={toConnect}>
        Connect
      </Button>
    </div>
  );
}

export default ConnectionController;
