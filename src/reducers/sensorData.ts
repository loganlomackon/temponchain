import { SensorData, Action, ActionTypes } from '../actions';

export const sensorDataReducer = (state: SensorData[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.getList:
      return action.data;
    default:
      return state;
  }
};
