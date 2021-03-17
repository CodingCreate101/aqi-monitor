import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
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
  },
];
function CityAirQualityIndexTable({ data, selectionForComparison, setSelectedForComparison }) {
  const classes = useStyles();

  // Virtualized table
  return (
    <div style={{ width: 450 }} className={classes.root}>
      <DataGrid
        onSelectionModelChange={newSelection => {
          setSelectedForComparison(newSelection.selectionModel);
        }}
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

export default CityAirQualityIndexTable;
