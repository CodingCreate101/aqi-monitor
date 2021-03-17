import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

//* Style guide
//* BG: #b71c1c | Text: #fff   -     severe (401-500)
//* BG: #f44336 | Text: #fff   -     veryPoor (301–400)
//* BG: #ff9800 | Text: #000   -     poor (201–300)
//* BG: #ffeb3b | Text: #000   -     moderate (101–200)
//* BG: #66bb6a | Text: #000   -     satisfactory (51–100)
//* BG: #2e7d32 | Text: #fff   -     good (0–50)

export const severityConditionedStyles = param =>
  clsx('', {
    severe: 401 <= param && param <= 500,
    veryPoor: 301 <= param && param <= 400.999,
    poor: 201 <= param && param <= 300.999,
    moderate: 101 <= param && param <= 200.999,
    satisfactory: 51 <= param && param <= 100.999,
    good: 0 <= param && param <= 50.999,
  });

export const useStyles = makeStyles({
  root: {
    '& .severe': {
      backgroundColor: '#b71c1c',
      color: '#fff',
      fontWeight: '600',
    },
    '& .veryPoor': {
      backgroundColor: '#f44336',
      color: '#fff',
      fontWeight: '600',
    },
    '& .poor': {
      backgroundColor: '#ff9800',
      color: '#000',
      fontWeight: '600',
    },
    '& .moderate': {
      backgroundColor: '#ffeb3b',
      color: '#000',
      fontWeight: '600',
    },
    '& .satisfactory': {
      backgroundColor: '#66bb6a',
      color: '#000',
      fontWeight: '600',
    },
    '& .good': {
      backgroundColor: '#2e7d32',
      color: '#fff',
      fontWeight: '600',
    },
  },
});
