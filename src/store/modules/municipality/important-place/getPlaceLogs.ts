import { Dispatch } from "redux";
import { AppThunk } from "../../..";

import { apiList } from "../../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../../helper/default-action";
import initDefaultReducer from "../../../helper/default-reducer";
import initialState from "../../../helper/default-state";

export interface PlaceLogsType {
  id: number,
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
 

const apiDetails = Object.freeze(apiList.PlaceLog.getPlaceLogs);

export default function getPlaceLogsReducer(state = initialState, action: DefaultAction): DefaultState<PlaceLogsType[]> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const getPlaceLogsAction = (): AppThunk<APIResponseDetail<PlaceLogsType[]>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { ...apiDetails });
};