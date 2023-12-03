import { combineReducers } from "redux";
import postWaterLogs from "./postWaterLogs";
import getWaterLogs from "./getWaterLogs";
import deleteWaterLogs from "./deleteWaterLogs";
import updateWaterLogs from "./updateWaterLogs";

const WaterReducer = combineReducers({
  postWaterLogs,
  getWaterLogs,
  deleteWaterLogs,
  updateWaterLogs
});

export default WaterReducer;