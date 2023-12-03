import { Dispatch } from "redux";
import { AppThunk } from "../../index";
import { apiList } from "../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";

export type DistrictType = {
    id: number;
    district_name: string

}[]

const apiDetails = Object.freeze(apiList.districtLogs.getDistrictLogs);

export default function getDistrictLogsReducer(state = initialState, action: DefaultAction): DefaultState<DistrictType> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const getDistrictLogsAction = (): AppThunk<APIResponseDetail<any>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { disableToast: true });
  };

