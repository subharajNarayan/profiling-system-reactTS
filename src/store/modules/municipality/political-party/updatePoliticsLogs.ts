import { Dispatch } from "redux";
import { AppThunk } from "../../..";

import { apiList } from "../../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../../helper/default-action";
import initDefaultReducer from "../../../helper/default-reducer";
import initialState from "../../../helper/default-state";


type RequestData = {
  // id: number,
  politicsname: string,
  comm_male: number,
  comm_female: number,
  comm_other: number,
  reli_male: number,
  reli_female: number,
  reli_other: number,
  dalit_male: number,
  dalit_female: number,
  dalit_other: number,
  tribes_male: number,
  tribes_female: number,
  tribes_other: number,
  other_male: number,
  other_female: number,
  other_other:number
}

const apiDetails = Object.freeze(apiList.PoliticalLog.updatePoliticalLogs);

export default function updatePoliticalLogsReducer(state = initialState, action: DefaultAction): DefaultState<RequestData> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const updatePoliticalLogsAction = (id: any, requestData: RequestData): AppThunk<APIResponseDetail<RequestData>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { requestData, pathVariables: { id}, disableToast: true })
}