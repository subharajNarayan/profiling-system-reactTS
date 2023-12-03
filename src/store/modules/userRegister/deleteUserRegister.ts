import { Dispatch } from "redux";
import { AppThunk } from "../..";

import { apiList } from "../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";


type RequestData = {
    _id:string
    firstname: string
    middlename: string 
    lastname: string
    address: string
    email: string
    message: string
}

const apiDetails = Object.freeze(apiList.userRegisterLog.deleteUserRegister);

export default function deleteUserRegisterReducer(state = initialState, action: DefaultAction): DefaultState<RequestData> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const deleteUserRegisterAction = (_id: any): AppThunk<APIResponseDetail<RequestData>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { pathVariables: {_id}, disableSuccessToast: true })
}