import { combineReducers } from 'redux';
import { sensorDataReducer } from './sensorData';
import { SensorData } from '../actions';

export interface StoreState {
  data: SensorData[];
}

export const reducers = combineReducers<StoreState>({
  data: sensorDataReducer,
});
