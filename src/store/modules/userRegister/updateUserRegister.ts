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

const apiDetails = Object.freeze(apiList.userRegisterLog.updateUserRegister);

export default function updateUserRegisterReducer(state = initialState, action: DefaultAction): DefaultState<RequestData> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const updateUserRegisterAction = (_id: any, requestData: RequestData): AppThunk<APIResponseDetail<RequestData>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { requestData, pathVariables: {_id}, disableSuccessToast: true })
}