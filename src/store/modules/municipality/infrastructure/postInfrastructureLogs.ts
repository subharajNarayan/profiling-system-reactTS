import { Dispatch } from "redux";
import { AppThunk } from "../../..";

import { apiList } from "../../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../../helper/default-action";
import initDefaultReducer from "../../../helper/default-reducer";
import initialState from "../../../helper/default-state";

type RequestData = {
  id: number;
  infra_name: string,
  ward_id: number,
  infra_type: string,
  no_of_benefitted: number,
  road_length: number,
  benefitted_wards: string,
  bridge_type: string,
  road_type: string,
  capacity: string,
}

const apiDetails = Object.freeze(apiList.infrastructureLog.postInfrastructureLogs);

export default function postInfrastructureLogsReducer(state = initialState, action: DefaultAction): DefaultState<RequestData> {
  const stateCopy = Object.assign({}, state);
  const actionName = apiDetails.actionName;

  return initDefaultReducer(actionName, action, stateCopy);
}

export const postInfrastructureLogsAction = (requestData: any): AppThunk<APIResponseDetail<RequestData>> => async (dispatch: Dispatch) => {
  return await initDefaultAction(apiDetails, dispatch, { requestData, disableToast: true })
}