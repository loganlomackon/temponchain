import {
  SensorPageData,
  ActionTypes,
  GetRecentSensorDataListAction,
} from '../actions';

export const sensorDataReducer = (
  state: SensorPageData = { sensorDatas: [], chainDatas: [] },
  action: GetRecentSensorDataListAction
) => {
  switch (action.type) {
    case ActionTypes.getRecentSensorDataList:
      return action.data;
    default:
      return state;
  }
};
