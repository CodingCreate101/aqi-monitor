import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  singleCityView: {
    [theme.breakpoints.down('sm')]: {
      order: 2,
    },
  },
  cityList: {
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
  comparisonGraphs: {
    [theme.breakpoints.down('sm')]: {
      order: 3,
    },
  },
}));

export default useStyles;
