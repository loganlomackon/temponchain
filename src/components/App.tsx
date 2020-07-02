import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../reducers';
import { SensorData, getListSensorData } from '../actions';
import SensorDataTable from './SensorDataTable';
import './App.css';

interface AppProps {
  data: SensorData[];
  getListSensorData: Function;
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
    if (!prevProps.data.length && this.props.data.length) {
      this.setState({ loading: false });
    }
  }

  // renderList(): JSX.Element[] {
  //   return this.props.data.map((data: SensorData) => {
  //     return <div key={data.id}>{data.temperature}</div>;
  //   });
  // }

  render() {
    this.props.getListSensorData();
    //this.setState({ loading: true });
    const sensorDataTableProps = {
      data: this.props.data,
    };

    return (
      <div>
        <header className="App-header">IOT即時上鏈</header>
        <p className="App-content">
          收集感測器回傳的即時數據，藉區塊鏈驗證真實性。
        </p>
        <SensorDataTable {...sensorDataTableProps} />
      </div>
    );
  }
}

const mapStateToProps = ({ data }: StoreState): { data: SensorData[] } => {
  return { data };
};

export const App = connect(mapStateToProps, { getListSensorData })(_App);
