import { combineReducers } from "redux";
import postSchoolLogs from "./postSchoolLogs";
import getSchoolLogs from "./getSchoolLogs";
import deleteSchoolLogs from "./deleteSchoolLogs";
import updateSchoolLogs from "./updateSchoolLogs";

const SchoolReducer = combineReducers({
  postSchoolLogs,
  getSchoolLogs,
  deleteSchoolLogs,
  updateSchoolLogs
});

export default SchoolReducer;