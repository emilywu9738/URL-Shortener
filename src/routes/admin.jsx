import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

export default function AdminTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(
      'https://9ed5pacord.execute-api.ap-southeast-2.amazonaws.com/v1/allUrl',
    )
      .then((response) => response.json())
      .then((data) => {
        const parsedData = JSON.parse(data.body);
        console.log(parsedData);
        setRows(parsedData);
      })
      .then(() => console.log(rows));
  }, []);

  return (
    <>
      <Typography
        sx={{
          marginTop: 3,
          marginBottom: 3,
          marginLeft: 2,
          fontWeight: 'bold',
        }}
        variant='h4'
        id='tableTitle'
        component='div'
      >
        URL Management System - Admin
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size='small' aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align='right'>Long URL</TableCell>
              <TableCell align='right'>Short URL</TableCell>
              <TableCell align='right'>Number of Clicks</TableCell>
              <TableCell align='right'>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row._id}
                </TableCell>
                <TableCell align='right'>{row.longurl}</TableCell>
                <TableCell align='right'>{row.shorturl}</TableCell>
                <TableCell align='right'>{row.numOfClicks}</TableCell>
                <TableCell align='right'>{row.lastUpdate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
