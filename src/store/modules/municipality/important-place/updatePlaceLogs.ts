import { Dispatch } from "redux";
import { AppThunk } from "../../..";

import { apiList } from "../../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../../helper/default-action";
import initDefaultReducer from "../../../helper/default-reducer";
import initialState from "../../../helper/default-state";


type RequestData = {
  placename: string,
  ward_id: number,
  place_type: string,
  place_area: number,
  ownership: string,
  accessby: string,
  hotelno: number,
  distance: number,
  tourist_internal: number,
  tourist_foreign: number,
  revenue: number,
  annual_prgm_no: number
}

const apiDetails = Object.freeze(apiList.PlaceLog.updatePlaceLogs);

export default function updatePlaceLogsReducer(state = initialState, action: DefaultAction): DefaultState<RequestData> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const updatePlaceLogsAction = (id: any, requestData: RequestData): AppThunk<APIResponseDetail<RequestData>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { requestData, pathVariables: { id}, disableToast: true })
}