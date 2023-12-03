import { combineReducers } from "redux";
import postWardLogs from "./postWardLogs";
import getWardLogs from "./getWardLogs";
import deleteWardLogs from "./deleteWardLogs";
import updateWardLogs from "./updateWardLogs";

const WardActions = combineReducers({
  postWardLogs,
  getWardLogs,
  deleteWardLogs,
  updateWardLogs,
})

export default WardActions;