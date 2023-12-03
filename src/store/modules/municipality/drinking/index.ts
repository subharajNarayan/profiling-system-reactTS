import { combineReducers } from "redux";
import postDrinkingLogs from "./postDrinkingLogs";
import getDrinkingLogs from "./getDrinkingLogs";
import deleteDrinkingLogs from "./deleteDrinkingLogs";
import updateDrinkingLogs from "./updateDrinkingLogs";

const drinkingReducer = combineReducers({
  postDrinkingLogs,
  getDrinkingLogs,
  deleteDrinkingLogs,
  updateDrinkingLogs
});

export default drinkingReducer;