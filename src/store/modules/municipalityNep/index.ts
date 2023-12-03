import { combineReducers } from "redux";
import postMunicipalityLogs from "./postMunicipalityLog";
import getMunicipalityLogs from "./getMunicipalityLog";
import updateMunicipalityLogs from "./updateMunicipalityLog";
import deleteMunicipalityLogs from "./deleteMunicipalityLog";


const municipalityReducer = combineReducers({
  postMunicipalityLogs,
  getMunicipalityLogs,
  updateMunicipalityLogs,
  deleteMunicipalityLogs
});

export default municipalityReducer;