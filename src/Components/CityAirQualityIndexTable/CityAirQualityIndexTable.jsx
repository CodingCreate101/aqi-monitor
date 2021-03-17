import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

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
  },
  {
    field: 'dateTime',
    headerName: ' Last updated',
    width: 160,
    type: 'string',
  },
];
function CityAirQualityIndexTable({ data }) {
  // Virtualized table
  return (
    <div style={{ width: 450 }}>
      <DataGrid autoHeight rows={data} columns={columns} pageSize={15} checkboxSelection />
    </div>
  );
}

export default CityAirQualityIndexTable;
