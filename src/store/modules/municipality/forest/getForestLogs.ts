import { Dispatch } from "redux";
import { AppThunk } from "../../..";

import { apiList } from "../../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../../helper/default-action";
import initDefaultReducer from "../../../helper/default-reducer";
import initialState from "../../../helper/default-state";

export interface ForestLogsType {
  forest_id: number;  
  forest_name: string,
  ward_id: number,
  forest_type: string,
  forest_res: string,
  area: number,
  forest_graze: string,
  forest_theft: string,
  forest_households: number,
}
 

const apiDetails = Object.freeze(apiList.forestLog.getForestLogs);

export default function getForestLogsReducer(state = initialState, action: DefaultAction): DefaultState<ForestLogsType[]> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const getForestLogsAction = (): AppThunk<APIResponseDetail<ForestLogsType[]>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { ...apiDetails });
};