import React, { useCallback } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import ReactTimeAgo from 'react-time-ago';
import { severityConditionedStyles, useStyles } from './CityAirQualityIndexTableStyles';

const columns = [
  {
    field: 'city',
    headerName: 'City',
    width: 150,
  },
  {
    field: 'aqi',
    headerName: 'AQI',
    width: 80,
    type: 'number',
    cellClassName: ({ value }) => severityConditionedStyles(value),
  },
  {
    field: 'dateTime',
    headerName: ' Last updated',
    width: 160,
    type: 'string',
    renderCell: params => <ReactTimeAgo date={params.value} locale="en-US" />,
  },
];
function CityAirQualityIndexTable({ data, selectionForComparison, setSelectedForComparison }) {
  const classes = useStyles();

  const memoizedOnSelectionModelChange = useCallback(newSelection => {
    setSelectedForComparison(newSelection.selectionModel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Virtualized table
  return (
    <div style={{ width: 450 }} className={classes.root}>
      <DataGrid
        onSelectionModelChange={memoizedOnSelectionModelChange}
        selectionModel={selectionForComparison}
        autoHeight
        rows={data}
        columns={columns}
        pageSize={15}
        checkboxSelection
      />
    </div>
  );
}

export default React.memo(CityAirQualityIndexTable);
