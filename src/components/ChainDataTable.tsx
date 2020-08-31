import React, { ReactElement } from 'react';
import { ChainData } from '../actions/sensorData';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  tableContainer: {
    width: '220px',
  },

  table: {
    borderCollapse: 'collapse',
    backgroundColor: 'white',
  },

  stripeRow: {
    backgroundColor: '#f2f2f2',
  },
});

interface Props {
  chainData: ChainData[];
}

export default function ChainDataTable(props: Props): ReactElement {
  const classes = useStyles();
  var rows: ChainData[] = props.chainData;

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ width: '100px' }}>
              Time
            </TableCell>
            <TableCell align="center" style={{ width: '100px' }}>
              Hash
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.recorded_at}>
              <TableCell align="center" style={{ width: '100px' }}>
                {row.recorded_at}
              </TableCell>
              <TableCell
                align="center"
                style={{
                  width: '100px',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  fontSize: '6px',
                }}
              >
                {row.hashed_data}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
