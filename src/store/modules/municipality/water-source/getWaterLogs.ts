import { Dispatch } from "redux";
import { AppThunk } from "../../..";

import { apiList } from "../../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../../helper/default-action";
import initDefaultReducer from "../../../helper/default-reducer";
import initialState from "../../../helper/default-state";

export interface WaterLogsType {
  id: number,
  watername: string,
  water_ward: string,
  water_res_type: string,
  usage_details: string,
  area: number,
  current_status: string,
}
 

const apiDetails = Object.freeze(apiList.WaterLog.getWaterLogs);

export default function getWaterLogsReducer(state = initialState, action: DefaultAction): DefaultState<WaterLogsType[]> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const getWaterLogsAction = (): AppThunk<APIResponseDetail<WaterLogsType[]>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { ...apiDetails });
};