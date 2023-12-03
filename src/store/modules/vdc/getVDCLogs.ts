  import { Dispatch } from "redux";
  import { AppThunk } from "../..";
  
  import { apiList } from "../../ActionNames";
  import initDefaultAction, { APIResponseDetail } from "../../helper/default-action";
  import initDefaultReducer from "../../helper/default-reducer";
  import initialState from "../../helper/default-state";
  
  
  export type VDCIntervalType = {
    id: number;
    vdc_name: string,
  }[]
  
  const apiDetails = Object.freeze(apiList.vdcLog.getVDCLogs);
  
  export default function getVDCLogsReducer(state = initialState, action: DefaultAction): DefaultState<VDCIntervalType> {
      const stateCopy = Object.assign({}, state);
      const actionName = apiDetails.actionName;
      return initDefaultReducer(actionName, action, stateCopy);
    }
      
      export const getVDCLogsAction = (): AppThunk<APIResponseDetail<VDCIntervalType>> => async (dispatch: Dispatch) => {      
        return await initDefaultAction(apiDetails, dispatch, { disableSuccessToast: true });
  };