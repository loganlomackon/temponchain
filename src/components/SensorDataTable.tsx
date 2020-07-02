import React, { ReactElement } from 'react';
import { SensorData } from '../actions/sensorData';
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
    width: '40%',
  },

  table: {
    borderCollapse: 'collapse',
    backgroundColor: 'white',
  },

  stripeRow: {
    backgroundColor: '#f2f2f2',
  },
});
//   th, td {
//     text-align: left;
//     padding: 8px;
//   }

//   tr:nth-child(even) {background-color: #f2f2f2;}
// });

interface Props {
  data: SensorData[];
}

export default function SensorDataTable(props: Props): ReactElement {
  const classes = useStyles();
  var rows: SensorData[] = props.data;

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">DeviceID</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Temperature</TableCell>
            <TableCell align="right">Humidity</TableCell>
            <TableCell align="right">Battery</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.recorded_at}>
              <TableCell component="th" scope="row">
                辦公室監測01
              </TableCell>
              <TableCell align="right">{row.recorded_at}</TableCell>
              <TableCell align="right">
                {row.temperature}
                {row.temperature_unit}
              </TableCell>
              <TableCell align="right">{row.humidity}</TableCell>
              <TableCell align="right">{row.battery}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// class TableColumnInput {
//   constructor(public Header: string, public accessor: string) {}
// }
// class TableInput {
//   constructor(public Header: string, public columns: TableColumnInput[]) {}
// }

// export function SensorDataTable(props: Props): ReactElement {
//   // const columns = [
//   //   new TableInput(' ', [
//   //     new TableColumnInput('ID', 'id'),
//   //     new TableColumnInput('Time', 'recorded_at'),
//   //     new TableColumnInput('Temperature', 'temperature'),
//   //     new TableColumnInput('Humidity', 'humidity'),
//   //     new TableColumnInput('Battery', 'battery'),
//   //   ]),
//   // ];
//   const columns = [
//     new TableColumnInput('ID', 'id'),
//     new TableColumnInput('Time', 'recorded_at'),
//     new TableColumnInput('Temperature', 'temperature'),
//     new TableColumnInput('Humidity', 'humidity'),
//     new TableColumnInput('Battery', 'battery'),
//   ];

//   return <Table<SensorData> columns={columns} data={props.data} />;
// }
