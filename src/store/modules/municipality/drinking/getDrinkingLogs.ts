import { Dispatch } from "redux";
import { AppThunk } from "../../..";

import { apiList } from "../../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../../helper/default-action";
import initDefaultReducer from "../../../helper/default-reducer";
import initialState from "../../../helper/default-state";

export interface OrganizationLogsType {
  id: number;  
  name: string,
  ward_id: number,
  beneficiary_wards: string,
  households_benefited_no: number,
  builtBy: string,
  current_situation: string,
  builtYear: string,
}
 

const apiDetails = Object.freeze(apiList.drinkingLog.getDrinkingLogs);

export default function getDrinkingLogsReducer(state = initialState, action: DefaultAction): DefaultState<OrganizationLogsType[]> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    // console.log(state,"STATE");
    return initDefaultReducer(actionName, action, stateCopy);
    
}



export const getDrinkingLogsAction = (): AppThunk<APIResponseDetail<OrganizationLogsType[]>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { ...apiDetails });
};
