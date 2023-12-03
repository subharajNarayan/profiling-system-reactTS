import { combineReducers } from "redux";
import postProvinceLogs from "./postProvinceLog";
import getProvinceLogs from "./getProvinceLog";
import updateProvinceLogs from "./updateProvinceLog";
import deleteProvinceLogs from "./deleteProvinceLog";

const provinceLogsReducer = combineReducers({
  postProvinceLogs,
  getProvinceLogs,
  updateProvinceLogs,
  deleteProvinceLogs
})

export default provinceLogsReducer;