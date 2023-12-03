import { Dispatch } from "redux";
import { AppThunk } from "../../..";

import { apiList } from "../../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../../helper/default-action";
import initDefaultReducer from "../../../helper/default-reducer";
import initialState from "../../../helper/default-state";

export interface IrrigationLogsType {
  id: number;  
  irri_name: string,
  irri_type: string,
  irri_period: string,
  households_benefited_no: number,
  builtBy: string,
  builtYear: string,
  irri_area: string,
  current_situation: string,
  beneficiary_wards: string,
}
 

const apiDetails = Object.freeze(apiList.irrigationLog.getIrrigationLogs);

export default function getIrrigationLogsReducer(state = initialState, action: DefaultAction): DefaultState<IrrigationLogsType[]> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const getIrrigationLogsAction = (): AppThunk<APIResponseDetail<IrrigationLogsType[]>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { ...apiDetails });
};