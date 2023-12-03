import { combineReducers } from "redux";
import postVDCLogs from "./postVDCLogs";
import getVDCLogs from "./getVDCLogs";
import deleteVDCLogs from "./deleteVDCLogs";
import updateVDCLogs from "./updateVDCLogs";

const VDCSystem = combineReducers({
  postVDCLogs,
  getVDCLogs,
  deleteVDCLogs,
  updateVDCLogs,
})

export default VDCSystem;