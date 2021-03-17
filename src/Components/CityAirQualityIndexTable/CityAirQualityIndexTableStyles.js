import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

//* Style guide
//* BG: #b71c1c | Text: #fff   -     severe (401-500)
//* BG: #f44336 | Text: #fff   -     veryPoor (301–400)
//* BG: #ff9800 | Text: #000   -     poor (201–300)
//* BG: #ffeb3b | Text: #000   -     moderate (101–200)
//* BG: #66bb6a | Text: #000   -     satisfactory (51–100)
//* BG: #2e7d32 | Text: #fff   -     good (0–50)

export const severityConditionedStyles = params =>
  clsx('', {
    severe: 401 <= params.value && params.value <= 500,
    veryPoor: 301 <= params.value && params.value <= 400.999,
    poor: 201 <= params.value && params.value <= 300.999,
    moderate: 101 <= params.value && params.value <= 200.999,
    satisfactory: 51 <= params.value && params.value <= 100.999,
    good: 0 <= params.value && params.value <= 50.999,
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
