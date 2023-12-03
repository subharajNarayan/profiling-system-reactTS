import { AnyAction, combineReducers } from "redux";
import loginReducer from "./modules/login/login";
import TokenService from "../services/jwt-token/jwt-token";
import i18nextReducer from "./modules/i18n/i18n";
import userDetails from "./modules/userDetails"
import outhReducer from "./modules/oauthservices";
import registerReducer from "./modules/register/register";
import getUserLogs from "./modules/userRegister";
import provinceData from "./modules/province";
import districtData from "./modules/district";
import municipalityData from "./modules/municipalityNep";
import vdcData from "./modules/vdc";
import wardData from "./modules/ward";
import OrganizationData from "./modules/municipality/organization";
import infrastructureData from "./modules/municipality/infrastructure";
import drinkingData from "./modules/municipality/drinking";
import irrigationData from "./modules/municipality/irrigation";
import forestData from "./modules/municipality/forest";
import disasterData from "./modules/municipality/environment-disaster";
import incomeStatementData from "./modules/municipality/income-statement";
import schoolData from "./modules/municipality/school";
import industryData from "./modules/municipality/industry-description";
import politicalData from "./modules/municipality/political-party";
import placeData from "./modules/municipality/important-place";
import exportData from "./modules/municipality/export-source";
import waterData from "./modules/municipality/water-source";

export const appReducer = combineReducers({
    i18nextData: i18nextReducer,
    loginData: loginReducer,
    registerData: registerReducer,
    outhService: outhReducer,
    userDetails,
    getUserLogs,
    provinceData,
    districtData,
    municipalityData,
    vdcData,
    wardData,
    OrganizationData,
    infrastructureData,
    drinkingData,
    irrigationData,
    forestData,
    disasterData,
    incomeStatementData,
    schoolData,
    industryData,
    politicalData,
    placeData,
    exportData,
    waterData
});

export type RootState = ReturnType<typeof appReducer>;
type TState = ReturnType<typeof appReducer> | undefined;

export default function rootReducer(state: TState, action: AnyAction) {
    if (action.type === "USER_LOG_OUT") {
        state = undefined;
        try {
        } catch (err) {
            console.error("Logout Error", err);
        }
    }
    return appReducer(state, action);
};

export const logoutAction = () => {
    try {
        TokenService.clearToken();
    } catch (err) {
        console.error("LogOut Error", err);
    }
    return { type: "USER_LOG_OUT", payload: {} };
};
