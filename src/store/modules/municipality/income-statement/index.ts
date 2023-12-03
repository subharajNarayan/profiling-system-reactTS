import { combineReducers } from "redux";
import postIncomeLogs from "./postIncomeLogs";
import getIncomeLogs from "./getIncomeLogs";
import deleteIncomeLogs from "./deleteIncomeLogs";
import updateIncomeLogs from "./updateIncomeLogs";

const forestReducer = combineReducers({
  postIncomeLogs,
  getIncomeLogs,
  deleteIncomeLogs,
  updateIncomeLogs
});

export default forestReducer;