import { Dispatch } from "redux";
import { AppThunk } from "../../..";

import { apiList } from "../../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../../helper/default-action";
import initDefaultReducer from "../../../helper/default-reducer";
import initialState from "../../../helper/default-state";


type RequestData = {
  id: number;  
  org_name: string;
  ward_id: number;
  est_year: string;
  org_type: string;
  samuha_male_no: number;
  samuha_female_no: number;
  samuha_other_no: number;
  mgmt_male_no: number;
  mgmt_female_no: number;
  mgmt_other_no: number;
  address: string;
}

const apiDetails = Object.freeze(apiList.organizationLog.updateOrganizationLogs);
export default function updateOrganizationLogsReducer(state = initialState, action: DefaultAction): DefaultState<RequestData> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const updateOrganizationLogsAction = (id: any, requestData: RequestData): AppThunk<APIResponseDetail<RequestData>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { requestData, pathVariables: { id}, disableToast: true })
}