import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../reducers';
import { SensorPageData, ChainData, getRecentSensorDataList } from '../actions';
import SensorDataTable, { SensorAggData } from './SensorDataTable';
import ChainDataTable from './ChainDataTable';
import './App.css';
import Grid from '@material-ui/core/Grid';
import CryptoJS from 'crypto-js';

interface AppProps {
  data: SensorPageData;
  getRecentSensorDataList: Function;
}
interface AppState {
  loading: boolean;
}

class _App extends React.Component<AppProps, AppState> {
  state = { loading: false };

  constructor(props: AppProps) {
    super(props);
  }

  componentDidUpdate(prevProps: AppProps): void {
    if (
      !prevProps.data.sensorDatas.length &&
      this.props.data.sensorDatas.length
    ) {
      this.setState({ loading: false });
    }
  }

  render() {
    this.props.getRecentSensorDataList();

    let sensorAggDatas: SensorAggData[] = [];
    let chainDatas: ChainData[] = [];
    var i, j;
    for (i = 0; i < this.props.data.sensorDatas.length; i++) {
      for (j = 0; j < this.props.data.chainDatas.length; j++) {
        if (
          this.props.data.sensorDatas[i].recorded_at ===
          this.props.data.chainDatas[j].recorded_at
        ) {
          const message: string = this.props.data.sensorDatas[i].id
            .concat(this.props.data.sensorDatas[i].recorded_at)
            .concat(this.props.data.sensorDatas[i].temperature.toString())
            .concat(this.props.data.sensorDatas[i].temperature_unit)
            .concat(this.props.data.sensorDatas[i].humidity.toString())
            .concat(this.props.data.sensorDatas[i].battery.toString());
          const realTimeHash: string = '0x'.concat(
            CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex)
          );

          sensorAggDatas.push(
            new SensorAggData(
              this.props.data.sensorDatas[i],
              this.props.data.chainDatas[j],
              realTimeHash
            )
          );
          chainDatas.push(this.props.data.chainDatas[j]);
          break;
        }
      }
    }

    const sensorDataTableProps = {
      data: sensorAggDatas,
    };
    const chainDataTableProps = {
      chainData: chainDatas,
    };

    return (
      <div>
        <header className="App-header">IOT即時上鏈</header>
        <h4>收集感測器回傳的即時數據，藉區塊鏈驗證真實性。</h4>
        <Grid container spacing={3}>
          <Grid item>
            <SensorDataTable {...sensorDataTableProps} />
          </Grid>
          <Grid item>
            <ChainDataTable {...chainDataTableProps} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ data }: StoreState): { data: SensorPageData } => {
  return { data };
};

export const App = connect(mapStateToProps, {
  getRecentSensorDataList,
})(_App);
