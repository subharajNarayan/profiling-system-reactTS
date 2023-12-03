import { Dispatch } from "redux";
import { AppThunk } from "../../index";
import { apiList } from "../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
import initDefaultReducer from "../../helper/default-reducer";
import initialState from "../../helper/default-state";

export type MunicipalityType = {
    id: number;
    munici_name: string,
    munici_type: string,

}[]

const apiDetails = Object.freeze(apiList.municipalityNepLog.getMunicipalityLogs);

export default function getMunicipalityLogsReducer(state = initialState, action: DefaultAction): DefaultState<MunicipalityType> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const getMunicipalityLogsAction = (): AppThunk<APIResponseDetail<any>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { disableToast: true });
  };

