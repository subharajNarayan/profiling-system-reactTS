import { Dispatch } from "redux";
import { AppThunk } from "../..";

import { apiList } from "../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";


type ResponseData = {
     

}

const apiDetails = Object.freeze(apiList.provinceLogs.deleteProvinceLogs);

export default function deleteProvinceLogsReducer(state = initialState, action: DefaultAction): DefaultState<ResponseData> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const deleteProvinceLogsAction = (id: any): AppThunk<APIResponseDetail<ResponseData>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { disableSuccessToast: true, pathVariables: { id } });
};