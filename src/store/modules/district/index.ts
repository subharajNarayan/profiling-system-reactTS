import { combineReducers } from "redux";
import postDistrictLogs from "./postDestrictLog";
import getDistrictLogs from "./getDistrictLog";
import deleteDistrictLogs from "./deleteDistrictLog";
import updateDistrictLogs from "./updateDistrictLog";

const districtLogsReducer = combineReducers({
  postDistrictLogs,
  getDistrictLogs,
  deleteDistrictLogs,
  updateDistrictLogs,
})

export default districtLogsReducer;