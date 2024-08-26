import React from 'react';
import { MaterialReactTable } from 'material-react-table';

const Table = ({ table, columns }) => {
  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default Table;
