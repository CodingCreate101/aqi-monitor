import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  connectionState: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    ' & div': {
      marginTop: 10,
    },
    ' & button': {
      marginTop: 10,
    },
  },

  green: {
    color: '#358600',
  },

  red: {
    color: '#ff6600',
  },
}));

export default useStyles;
