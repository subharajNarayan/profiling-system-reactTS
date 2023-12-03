import { combineReducers } from "redux";
import postForestLogs from "./postForestLogs";
import getForestLogs from "./getForestLogs";
import deleteForestLogs from "./deleteForestLogs";
import updateForestLogs from "./updateForestLogs";

const forestReducer = combineReducers({
  postForestLogs,
  getForestLogs,
  deleteForestLogs,
  updateForestLogs
});

export default forestReducer;