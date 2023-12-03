import { Dispatch } from "redux";
import { AppThunk } from "../../index";
import { apiList } from "../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";

export type ProvinceType = {
    id: number;
    state_name: string

}[]

const apiDetails = Object.freeze(apiList.provinceLogs.getProvinceLogs);

export default function getProvinceLogsReducer(state = initialState, action: DefaultAction): DefaultState<ProvinceType> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const getProvinceLogsAction = (): AppThunk<APIResponseDetail<any>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { disableToast: true });
  };

