import { combineReducers } from "redux";
import postPlaceLogs from "./postPlaceLogs";
import getPlaceLogs from "./getPlaceLogs";
import deletePlaceLogs from "./deletePlaceLogs";
import updatePlaceLogs from "./updatePlaceLogs";

const PlaceReducer = combineReducers({
  postPlaceLogs,
  getPlaceLogs,
  deletePlaceLogs,
  updatePlaceLogs
});

export default PlaceReducer;