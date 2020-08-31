import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface SensorPageData {
  sensorDatas: SensorData[];
  chainDatas: ChainData[];
}

export interface ChainData {
  recorded_at: string;
  hashed_data: string;
}
export interface SensorData {
  id: string;
  temperature: number;
  humidity: number;
  battery: number;
  temperature_unit: string;
  recorded_at: string;
  eth_txhash: string;
}

export interface GetRecentSensorDataListAction {
  type: ActionTypes.getRecentSensorDataList;
  data: SensorPageData;
}

const sensorUrl = 'http://35.221.155.56:9102/api/sensor_data';
const chainUrl = 'http://35.221.155.56:9100/api/iotchain/recent';

export const getRecentSensorDataList = () => {
  return async (dispatch: Dispatch) => {
    const sensorResponse = await axios.get<SensorData[]>(sensorUrl);
    let sensorResult: SensorData[] = sensorResponse.data;
    if (!sensorResult) {
      sensorResult = [];
    }

    const chainResponse = await axios.post<ChainData[]>(chainUrl, {
      sensor_id: '004DAEF5',
    });
    let chainResult: ChainData[] = chainResponse.data;
    if (!chainResult) {
      chainResult = [];
    }

    let result: SensorPageData = {
      sensorDatas: sensorResult,
      chainDatas: chainResult,
    };
    dispatch<GetRecentSensorDataListAction>({
      type: ActionTypes.getRecentSensorDataList,
      data: result,
    });
  };
};
