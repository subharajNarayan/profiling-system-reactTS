import { combineReducers } from "redux";
import getUserRegister from './getUserRegister';
import postUserRegister from "./postUserRegister";
import deleteUserRegister from "./deleteUserRegister";
import updateUserRegister from './updateUserRegister'

const userLogsReducer = combineReducers({
  getUserRegister,
  postUserRegister,
  deleteUserRegister,
  updateUserRegister,
})


export default userLogsReducer;