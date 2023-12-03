import { combineReducers } from "redux";
import postPoliticsLogs from "./postPoliticsLogs";
import getPoliticsLogs from "./getPoliticsLogs";
import deletePoliticsLogs from "./deletePoliticsLogs";
import updatePoliticsLogs from "./updatePoliticsLogs";

const PoliticsReducer = combineReducers({
  postPoliticsLogs,
  getPoliticsLogs,
  deletePoliticsLogs,
  updatePoliticsLogs
});

export default PoliticsReducer;