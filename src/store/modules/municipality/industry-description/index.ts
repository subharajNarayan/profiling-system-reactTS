import { combineReducers } from "redux";
import postIndustryLogs from "./postIndustryLogs";
import getIndustryLogs from "./getIndustryLogs";
import deleteIndustryLogs from "./deleteIndustryLogs";
import updateIndustryLogs from "./updateIndustryLogs";

const IndustryReducer = combineReducers({
  postIndustryLogs,
  getIndustryLogs,
  deleteIndustryLogs,
  updateIndustryLogs
});

export default IndustryReducer;