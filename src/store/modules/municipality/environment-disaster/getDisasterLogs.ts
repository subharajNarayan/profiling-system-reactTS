import { Dispatch } from "redux";
import { AppThunk } from "../../..";

import { apiList } from "../../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../../helper/default-action";
import initDefaultReducer from "../../../helper/default-reducer";
import initialState from "../../../helper/default-state";

export interface DisasterLogsType {
  id: number
  disaster_name: string,
  disaster_type: string,
  disaster_reason: string,
  disaster_area: number,
  disaster_effect: string,
  disaster_prevention: string,
  disasterWard: string,
  disasterYear: string
}
 

const apiDetails = Object.freeze(apiList.environment_disasterLog.getDisasterLogs);

export default function getDisasterLogsReducer(state = initialState, action: DefaultAction): DefaultState<DisasterLogsType[]> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const getDisasterLogsAction = (): AppThunk<APIResponseDetail<DisasterLogsType[]>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { ...apiDetails });
};