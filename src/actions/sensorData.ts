import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface SensorData {
  id: string;
  temperature: number;
  humidity: number;
  battery: number;
  temperature_unit: string;
  recorded_at: number;
}

export interface GetListSensorDataAction {
  type: ActionTypes.getList;
  data: SensorData[];
}

const url = 'http://localhost:8092/api/sensor_data';

export const getListSensorData = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<SensorData[]>(url);
    if (response.data) {
      console.log(response.data);
      dispatch<GetListSensorDataAction>({
        type: ActionTypes.getList,
        data: response.data,
      });
    } else {
      dispatch<GetListSensorDataAction>({
        type: ActionTypes.getList,
        data: [],
      });
    }
  };
};
