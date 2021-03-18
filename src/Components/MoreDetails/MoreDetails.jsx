import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';

import aqiChart from '../../image/air_pollution_standards.jpg';
import { Divider } from '@material-ui/core';
import { useStyles } from './MoreDetailsStyles';

function MoreDetails() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
        {/* Avoid using icon, because this is the ONLY place it was required */}
        <span style={{ fontSize: 20 }}>&#9776;</span>
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'More details & Options'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            An air quality index (AQI) is used by government agencies to communicate to the public
            how polluted the air currently is or how polluted it is forecast to become. Public
            health risks increase as the AQI rises.{' '}
            <a
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Air_quality_index"
              target="_blank"
            >
              Read more
            </a>
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <img width="100%" src={aqiChart} alt="Air quality index" />
        </DialogContent>
        <Divider />
        {/* More page options */}
        {/* <DialogContent>About | Contact</DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MoreDetails;
