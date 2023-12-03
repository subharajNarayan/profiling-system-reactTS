import { Dispatch } from "redux";
import { AppThunk } from "../../..";

import { apiList } from "../../../ActionNames";
import initDefaultAction, { APIResponseDetail } from "../../../helper/default-action";
import initDefaultReducer from "../../../helper/default-reducer";
import initialState from "../../../helper/default-state";

export interface SchoolLogsType {
  id: number,
  schoolname: string,
  ward_id: number,
  est_date: number,
  schooltype: string,
  schoollvl: string,
  admit_rate: number,
  school_leaving_rate: number,
  temp_building_no: number,
  temp_class_no: number,
  perm_building_no: number,
  perm_class_no: number,
  toilet_type: string,
  toilet_no: number,
  drinking_service: string,
  mgmt_male: number,
  mgmt_female: number,
  mgmt_other: number,
}
 

const apiDetails = Object.freeze(apiList.SchoolLog.getSchoolLogs);

export default function getSchoolLogsReducer(state = initialState, action: DefaultAction): DefaultState<SchoolLogsType[]> {
    const stateCopy = Object.assign({}, state);
    const actionName = apiDetails.actionName;

    return initDefaultReducer(actionName, action, stateCopy);
}

export const getSchoolLogsAction = (): AppThunk<APIResponseDetail<SchoolLogsType[]>> => async (dispatch: Dispatch) => {
    return await initDefaultAction(apiDetails, dispatch, { ...apiDetails });
};