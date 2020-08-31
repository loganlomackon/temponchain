import { combineReducers } from 'redux';
import { sensorDataReducer } from './sensorData';
import { SensorPageData } from '../actions';

export interface StoreState {
  data: SensorPageData;
}

export const reducers = combineReducers<StoreState>({
  data: sensorDataReducer,
});
