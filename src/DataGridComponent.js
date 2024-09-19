import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import data from './data.json';
import './App.css';  // or './styles.css'

const columns = [
  { field: 'customer', headerName: 'Customer', width: 200 },
  { field: 'lastSeen', headerName: 'Last Seen', width: 150 },
  { field: 'orders', headerName: 'Orders', type: 'number', width: 100 },
  { field: 'totalSpent', headerName: 'Total Spent ($)', width: 150 },
  { field: 'latestPurchase', headerName: 'Latest Purchase', width: 200 },
  {
    field: 'news',
    headerName: 'News',
    width: 100,
    renderCell: (params) => (params.value ? '✔️' : '❌'),
  },
  { field: 'segment', headerName: 'Segment', width: 100 }
];

export default function DataGridComponent() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setRows(data); // Load data from the JSON file
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    const filteredRows = data.filter((row) => {
      return (
        row.customer.toLowerCase().includes(searchTerm) ||
        row.segment.toLowerCase().includes(searchTerm)
      );
    });

    setRows(filteredRows);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by customer or segment"
        value={search}
        onChange={handleSearch}
        style={{ marginBottom: '20px', padding: '10px', width: '400px',fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #ccc', }}
      />
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5,10,20]}
          checkboxSelection
          disableSelectionOnClick
          sortingOrder={['asc', 'desc']}
        />
      </div>
    </div>
  );
}
