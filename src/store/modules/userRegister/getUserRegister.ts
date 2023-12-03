import { Dispatch } from "redux";
import { AppThunk } from "../..";

import { apiList } from "../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";


type UserRegisterType = {
  _id: number
  firstname: string
  middlename: string
  lastname: string
  address: string
  email: string
  message: string
}[]

const apiDetails = Object.freeze(apiList.userRegisterLog.userRegister);

export default function getUserRegisterReducer(state = initialState, action: DefaultAction): DefaultState<UserRegisterType> {
  const stateCopy = Object.assign({}, state);
  const actionName = apiDetails.actionName;

  return initDefaultReducer(actionName, action, stateCopy);
}

export const getUserLogsAction = (): AppThunk<APIResponseDetail<UserRegisterType>> => async (dispatch: Dispatch) => {
  return await initDefaultAction(apiDetails, dispatch, { disableSuccessToast: true })
}