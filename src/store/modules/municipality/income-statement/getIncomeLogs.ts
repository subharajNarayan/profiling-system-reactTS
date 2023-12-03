import { Dispatch } from "redux";
import { AppThunk } from "../../..";

import { apiList } from "../../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../../helper/default-action";
import initDefaultReducer from "../../../helper/default-reducer";
import initialState from "../../../helper/default-state";

export interface IncomeLogsType {
  id: number,
  income_title: string;  
  rate: number,
  mood: string,
}
 

const apiDetails = Object.freeze(apiList.income_statementLog.getIncomeStatementLogs);

export default function getIncomeLogsReducer(state = initialState, action: DefaultAction): DefaultState<IncomeLogsType[]> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const getIncomeLogsAction = (): AppThunk<APIResponseDetail<IncomeLogsType[]>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { ...apiDetails });
};