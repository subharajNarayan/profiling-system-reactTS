import { Dispatch } from "redux";
import { AppThunk } from "../..";

import { apiList } from "../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";


export type WardType = {
  ward_id: number;
  ward_number: number,
}[]

const apiDetails = Object.freeze(apiList.wardLog.getWardLogs);

export default function getWardLogsReducer(state = initialState, action: DefaultAction): DefaultState<WardType> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const getWardLogsAction = (): AppThunk<APIResponseDetail<WardType>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { disableSuccessToast: true });
};