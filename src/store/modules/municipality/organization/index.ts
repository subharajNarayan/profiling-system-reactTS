import { combineReducers } from "redux";
import postOrganizationLogs from "./postOrganizationLogs";
import getOrganizationLogs from "./getOrganizationLogs";
import deleteOrganizationLogs from "./deleteOrganizationLogs";
import updateOrganizationLogs from "./updateOrganizationLogs";

const organizationReducer = combineReducers({
  postOrganizationLogs,
  getOrganizationLogs,
  deleteOrganizationLogs,
  updateOrganizationLogs
});

export default organizationReducer;