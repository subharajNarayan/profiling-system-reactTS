import { combineReducers } from "redux";
import postExportLogs from "./postExportLogs";
import getExportLogs from "./getExportLogs";
import deleteExportLogs from "./deleteExportLogs";
import updateExportLogs from "./updateExportLogs";

const ExportReducer = combineReducers({
  postExportLogs,
  getExportLogs,
  deleteExportLogs,
  updateExportLogs
});

export default ExportReducer;