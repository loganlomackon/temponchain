import React, { ReactElement } from 'react';
import { SensorData, ChainData } from '../actions/sensorData';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Gavel from '@material-ui/icons/Gavel';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  tableContainer: {
    width: '715px',
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

export class SensorAggData {
  public id: string;
  public temperature: number;
  public humidity: number;
  public battery: number;
  public temperature_unit: string;
  public eth_txhash: string;
  public recorded_at: string;
  public hashed_data: string;

  public realTimeHash: string;

  constructor(
    sensorData: SensorData,
    chainData: ChainData,
    realTimeHash: string
  ) {
    this.id = sensorData.id;
    this.temperature = sensorData.temperature;
    this.humidity = sensorData.humidity;
    this.battery = sensorData.battery;
    this.temperature_unit = sensorData.temperature_unit;
    this.eth_txhash = sensorData.eth_txhash;
    this.recorded_at = sensorData.recorded_at;
    this.hashed_data = chainData.hashed_data;
    this.realTimeHash = realTimeHash;
  }
}

interface Props {
  data: SensorAggData[];
}

const onVerify = (data: SensorAggData) => {
  const result: boolean = data.hashed_data === data.realTimeHash;
  const message = 'Verified Result:'
    .concat(result.toString())
    .concat('\nrealTimeHash:')
    .concat(data.realTimeHash);
  alert(message);
};

export default function SensorDataTable(props: Props): ReactElement {
  const classes = useStyles();
  var rows: SensorAggData[] = props.data;

  return (
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ width: '100px' }}>
              DeviceID
            </TableCell>
            <TableCell align="center" style={{ width: '120px' }}>
              Time
            </TableCell>
            <TableCell align="center" style={{ width: '100px' }}>
              Temperature
            </TableCell>
            <TableCell align="center" style={{ width: '75px' }}>
              Humidity
            </TableCell>
            <TableCell align="center" style={{ width: '75px' }}>
              Battery
            </TableCell>
            <TableCell align="center" style={{ width: '100px' }}>
              TxHash
            </TableCell>
            <TableCell align="center" style={{ width: '75px' }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.recorded_at}>
              <TableCell align="center" style={{ width: '100px' }}>
                辦公室監測01
              </TableCell>
              <TableCell align="center" style={{ width: '120px' }}>
                {row.recorded_at}
              </TableCell>
              <TableCell align="center" style={{ width: '100px' }}>
                {row.temperature}
                {row.temperature_unit}
              </TableCell>
              <TableCell align="center" style={{ width: '75px' }}>
                {row.humidity}
              </TableCell>
              <TableCell align="center" style={{ width: '75px' }}>
                {row.battery}
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
                <Link
                  href={'https://rinkeby.etherscan.io/tx/'.concat(
                    row.eth_txhash
                  )}
                >
                  {row.eth_txhash}
                </Link>
              </TableCell>
              <TableCell
                align="center"
                style={{
                  width: '75',
                }}
              >
                <IconButton
                  color="primary"
                  aria-label="Check Hashed Data"
                  component="span"
                  onClick={() => onVerify(row)}
                >
                  <Gavel />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
