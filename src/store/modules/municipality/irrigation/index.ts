import { combineReducers } from "redux";
import postIrrigationLogs from "./postIrrigationLogs";
import getIrrigationLogs from "./getIrrigationLogs";
// import deleteIrrigationLogs from "./deleteIrrigationLogs";
// import updateIrrigationLogs from "./updateIrrigationLogs";

const irrigationReducer = combineReducers({
  postIrrigationLogs,
  getIrrigationLogs,
  // deleteIrrigationLogs,
  // updateIrrigationLogs
});

export default irrigationReducer;