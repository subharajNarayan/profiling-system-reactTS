import { Dispatch } from "redux";
import { AppThunk } from "../..";

import { apiList } from "../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";


type RequestData = {
    ward_number: number,    
}

const apiDetails = Object.freeze(apiList.wardLog.updateWardLogs);

export default function updateWardLogsReducer(state = initialState, action: DefaultAction): DefaultState<RequestData> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const updateWardLogsAction = (id: any, requestData: RequestData): AppThunk<APIResponseDetail<RequestData>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { requestData, pathVariables: { id}, disableToast: true })
}