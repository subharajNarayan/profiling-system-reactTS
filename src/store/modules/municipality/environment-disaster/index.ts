import { combineReducers } from "redux";
import postDisasterLogs from "./postDisasterLogs";
import getDisasterLogs from "./getDisasterLogs";
import deleteDisasterLogs from "./deleteDisasterLogs";
import updateDisasterLogs from "./updateDisasterLogs";

const forestReducer = combineReducers({
  postDisasterLogs,
  getDisasterLogs,
  deleteDisasterLogs,
  updateDisasterLogs
});

export default forestReducer;