import { Dispatch } from "redux";
import { AppThunk } from "../../..";

import { apiList } from "../../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../../helper/default-action";
import initDefaultReducer from "../../../helper/default-reducer";
import initialState from "../../../helper/default-state";


type RequestData = {
  id: number,
  industryname: string,
  industryward_id: number,
  industry_type: string,
  industry_currentstatus: string,
  industry_product: string,
  industry_income: number,
  emp_male: number,
  emp_female: number,
  emp_other: number,
}

const apiDetails = Object.freeze(apiList.IndustryLog.updateIndustryLogs);

export default function updateIndustryLogsReducer(state = initialState, action: DefaultAction): DefaultState<RequestData> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const updateIndustryLogsAction = (id: any, requestData: RequestData): AppThunk<APIResponseDetail<RequestData>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { requestData, pathVariables: { id}, disableToast: true })
}