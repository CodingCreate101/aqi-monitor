import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 2,
  },
}));
