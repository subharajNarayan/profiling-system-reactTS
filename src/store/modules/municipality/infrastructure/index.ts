import { combineReducers } from "redux";
import postInfrastructureLogs from "./postInfrastructureLogs";
import getInfrastructureLogs from "./getInfrastructureLogs";
import deleteInfrastructureLogs from "./deleteInfrastructureLogs";
import updateInfrastructureLogs from "./updateInfrastructureLogs";

const infrastructureReducer = combineReducers({
  postInfrastructureLogs,
  getInfrastructureLogs,
  deleteInfrastructureLogs,
  updateInfrastructureLogs,
});

export default infrastructureReducer;