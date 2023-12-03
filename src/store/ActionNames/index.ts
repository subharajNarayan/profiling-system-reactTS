export enum RequestMethod {
  GET = "GET",
  DELETE = "DELETE",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  PURGE = "PURGE",
  LINK = "LINK",
  UNLINK = "UNLINK",
}

export enum RequestBodyType {
  /**If request id in application/x-www-form-urlencoded as string*/
  QUERYSTRING = "QUERY-STRING",
  /**If request is in formdata*/
  FORMDATA = "FORM-DATA",
  /**If request requires Bearer*/
  AUTH = "AUTH",
  /**If request is open*/
  NOAUTH = "NO-AUTH",
}

export interface apiDetailType {
  /**Redux Action Name */
  actionName: string;
  /**Request API URI */
  controllerName: string;
  /**Request Method; Defaults as GET */
  requestMethod?: RequestMethod;
  /**Request Body Type */
  requestBodyType?: RequestBodyType;
}


const apiDetails = {
  local: {
    i18n: {
      controllerName: "",
      actionName: "I18N"
    },
  },
  oauth: {
    login: {
      controllerName: "/api/signin",
      actionName: "LOGIN",
      requestMethod: RequestMethod.POST,
      requestBodyType: RequestBodyType.NOAUTH
    },
    register: {
      controllerName: "/api/signup",
      actionName: "REGISTER",
      requestMethod: RequestMethod.POST,
      requestBodyType: RequestBodyType.NOAUTH
    },
    init: {
      controllerName: "/oauth/user/init/data",
      actionName: "INIT",
      requestMethod: RequestMethod.GET
    },
    autosearch: {
      controllerName: "/api/v1/search_animal/",
      actionName: "AUTOSEARCH",
      requestMethod: RequestMethod.GET
    },
  },
  userRegisterLog: {
    userRegister: {
      controllerName: "/api/register.json",
      actionName: "GET_USER_REGISTER",
      requestMethod: RequestMethod.GET,
    },
    postUserRegister: {
      controllerName: "/api/register.json",
      actionName: "GET_USER_REGISTER",
      requestMethod: RequestMethod.POST,
      requestBodyType: RequestBodyType.AUTH
    },
    deleteUserRegister: {
      controllerName: "/api/register/{_id}.json",
      actionName: "DELETE_USER_REGISTER",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
    updateUserRegister: {
      controllerName: "/api/register/{_id}",
      actionName: "DELETE_USER_REGISTER",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    }
  },
  provinceLogs: {
    postProvinceLogs: {
      controllerName: "/api/state",
      actionName: "POST_STATE",
      requestMethod: RequestMethod.POST,
      requestBodyType: RequestBodyType.AUTH
    },
    getProvinceLogs: {
      controllerName: "/api/state",
      actionName: "GET_STATE",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    updateProvinceLogs: {
      controllerName: "/api/state/{id}",
      actionName: "UPDATE_STATE",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
    deleteProvinceLogs: {
      controllerName: "/api/state/{id}",
      actionName: "DELETE_STATE",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
  },
  districtLogs: {
    postDistrictLogs: {
      controllerName: "/api/district",
      actionName: "POST_DISTRICT",
      requestMethod: RequestMethod.POST,
      requestBodyType: RequestBodyType.AUTH
    },
    getDistrictLogs: {
      controllerName: "/api/district",
      actionName: "GET_DISTRICT",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    deleteDistrictLogs: {
      controllerName: "/api/district/{id}",
      actionName: "DELETE_DISTRICT",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
    updateDistrictLogs: {
      controllerName: "/api/district/{id}",
      actionName: "UPDATE_DISTRICT",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
  },
  municipalityNepLog: {
    postMunicipalityLogs: {
      controllerName: "/api/municipality",
      actionName: "POST_MUNICIPALITY",
      requestMethod: RequestMethod.POST,
      requrestBodyType: RequestBodyType.AUTH
    },
    getMunicipalityLogs: {
      controllerName: "/api/municipality",
      actionName: "GET_MUNICIPALITY",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    updateMunicipalityLogs: {
      controllerName: "/api/municipality/{id}",
      actionName: "UPDATE_MUNICIPALITY",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
    deleteMunicipalityLogs: {
      controllerName: "/api/municipality/{id}",
      actionName: "DELETE_MUNICIPALITY",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
  },
  vdcLog: {
    postVDCLogs: {
      controllerName: "/api/vdc",
      actionName: "POST_VDC",
      requestMethod: RequestMethod.POST,
      requrestBodyType: RequestBodyType.AUTH
    },
    getVDCLogs: {
      controllerName: "/api/vdc",
      actionName: "GET_VDC",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    updateVDCLogs: {
      controllerName: "/api/vdc/{id}",
      actionName: "UPDATE_VDC",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
    deleteVDCLogs: {
      controllerName: "/api/vdc/{id}",
      actionName: "DELETE_VDC",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
  },
  wardLog: {
    postWardLogs: {
      controllerName: "/api/ward",
      actionName: "POST_WARD",
      requestMethod: RequestMethod.POST,
      requrestBodyType: RequestBodyType.AUTH
    },
    getWardLogs: {
      controllerName: "/api/ward",
      actionName: "GET_WARD",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    updateWardLogs: {
      controllerName: "/api/ward/{id}",
      actionName: "UPDATE_WARD",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
    deleteWardLogs: {
      controllerName: "/api/ward/{id}",
      actionName: "DELETE_WARD",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
  },

  // MUNICIPALITY
  organizationLog: {
    postOrganizationLogs: {
      controllerName: "/api/organization",
      actionName: "POST_ORGANIZATION",
      requestMethod: RequestMethod.POST,
      requrestBodyType: RequestBodyType.AUTH
    },
    getOrganizationLogs: {
      controllerName: "/api/organization",
      actionName: "GET_ORGANIZATION",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    updateOrganizationLogs: {
      controllerName: "/api/organization/{id}",
      actionName: "UPDATE_ORGANIZATION",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
    deleteOrganizationLogs: {
      controllerName: "/api/organization/{id}",
      actionName: "DELETE_ORGANIZATION",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
  },
  infrastructureLog: {
    postInfrastructureLogs: {
      controllerName: "/api/infrastructure",
      actionName: "POST_INFRASTRUCTURE",
      requestMethod: RequestMethod.POST,
      requrestBodyType: RequestBodyType.AUTH
    },
    getInfrastructureLogs: {
      controllerName: "/api/infrastructure",
      actionName: "GET_INFRASTRUCTURE",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    updateInfrastructureLogs: {
      controllerName: "/api/infrastructure/{id}",
      actionName: "UPDATE_INFRASTRUCTURE",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
    deleteInfrastructureLogs: {
      controllerName: "/api/infrastructure/{id}",
      actionName: "DELETE_INFRASTRUCTURE",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
  },
  drinkingLog: {
    postDrinkingLogs: {
      controllerName: "/api/drinking",
      actionName: "POST_DRINKING",
      requestMethod: RequestMethod.POST,
      requrestBodyType: RequestBodyType.AUTH
    },
    getDrinkingLogs: {
      controllerName: "/api/drinking",
      actionName: "GET_DRINKING",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    updateDrinkingLogs: {
      controllerName: "/api/drinking/{id}",
      actionName: "UPDATE_DRINKING",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
    deleteDrinkingLogs: {
      controllerName: "/api/drinking/{id}",
      actionName: "DELETE_DRINKING",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
  },
  irrigationLog: {
    postIrrigationLogs: {
      controllerName: "/api/irrigation",
      actionName: "POST_IRRIGATION",
      requestMethod: RequestMethod.POST,
      requrestBodyType: RequestBodyType.AUTH
    },
    getIrrigationLogs: {
      controllerName: "/api/irrigation",
      actionName: "GET_IRRIGATION",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    updateIrrigationLogs: {
      controllerName: "/api/irrigation/{id}",
      actionName: "UPDATE_IRRIGATION",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
    deleteIrrigationLogs: {
      controllerName: "/api/irrigation/{id}",
      actionName: "DELETE_IRRIGATION",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
  },
  forestLog: {
    postForestLogs: {
      controllerName: "/api/forest",
      actionName: "POST_FOREST",
      requestMethod: RequestMethod.POST,
      requrestBodyType: RequestBodyType.AUTH
    },
    getForestLogs: {
      controllerName: "/api/forest",
      actionName: "GET_FOREST",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    updateForestLogs: {
      controllerName: "/api/forest/{id}",
      actionName: "UPDATE_FOREST",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
    deleteForestLogs: {
      controllerName: "/api/forest/{id}",
      actionName: "DELETE_FOREST",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
  },
  environment_disasterLog: {
    postDisasterLogs: {
      controllerName: "/api/disaster",
      actionName: "POST_DISASTER",
      requestMethod: RequestMethod.POST,
      requrestBodyType: RequestBodyType.AUTH
    },
    getDisasterLogs: {
      controllerName: "/api/disaster",
      actionName: "GET_DISASTER",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    updateDisasterLogs: {
      controllerName: "/api/disaster/{id}",
      actionName: "UPDATE_DISASTER",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
    deleteDisasterLogs: {
      controllerName: "/api/disaster/{id}",
      actionName: "DELETE_DISASTER",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
  },
  income_statementLog: {
    postIncomeStatementLogs: {
      controllerName: "/api/income-statement",
      actionName: "POST_INCOMESTATEMENT",
      requestMethod: RequestMethod.POST,
      requrestBodyType: RequestBodyType.AUTH
    },
    getIncomeStatementLogs: {
      controllerName: "/api/income-statement",
      actionName: "GET_INCOMESTATEMENT",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    updateIncomeStatementLogs: {
      controllerName: "/api/income-statement/{id}",
      actionName: "UPDATE_INCOMESTATEMENT",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
    deleteIncomeStatementLogs: {
      controllerName: "/api/income-statement/{id}",
      actionName: "DELETE_INCOMESTATEMENT",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
  },
  SchoolLog: {
    postSchoolLogs: {
      controllerName: "/api/school",
      actionName: "POST_SCHOOL",
      requestMethod: RequestMethod.POST,
      requrestBodyType: RequestBodyType.AUTH
    },
    getSchoolLogs: {
      controllerName: "/api/school",
      actionName: "GET_SCHOOL",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    updateSchoolLogs: {
      controllerName: "/api/school/{id}",
      actionName: "UPDATE_SCHOOL",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
    deleteSchoolLogs: {
      controllerName: "/api/school/{id}",
      actionName: "DELETE_SCHOOL",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
  },
  IndustryLog: {
    postIndustryLogs: {
      controllerName: "/api/industry",
      actionName: "POST_INDUSTRY",
      requestMethod: RequestMethod.POST,
      requrestBodyType: RequestBodyType.AUTH
    },
    getIndustryLogs: {
      controllerName: "/api/industry",
      actionName: "GET_INDUSTRY",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    updateIndustryLogs: {
      controllerName: "/api/industry/{id}",
      actionName: "UPDATE_INDUSTRY",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
    deleteIndustryLogs: {
      controllerName: "/api/industry/{id}",
      actionName: "DELETE_INDUSTRY",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
  },
  PoliticalLog: {
    postPoliticalLogs: {
      controllerName: "/api/politics",
      actionName: "POST_POLITICAL",
      requestMethod: RequestMethod.POST,
      requrestBodyType: RequestBodyType.AUTH
    },
    getPoliticalLogs: {
      controllerName: "/api/politics",
      actionName: "GET_POLITICAL",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    updatePoliticalLogs: {
      controllerName: "/api/politics/{id}",
      actionName: "UPDATE_POLITICAL",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
    deletePoliticalLogs: {
      controllerName: "/api/politics/{id}",
      actionName: "DELETE_POLITICAL",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
  },
  PlaceLog: {
    postPlaceLogs: {
      controllerName: "/api/place",
      actionName: "POST_PLACE",
      requestMethod: RequestMethod.POST,
      requrestBodyType: RequestBodyType.AUTH
    },
    getPlaceLogs: {
      controllerName: "/api/place",
      actionName: "GET_PLACE",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    updatePlaceLogs: {
      controllerName: "/api/place/{id}",
      actionName: "UPDATE_PLACE",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
    deletePlaceLogs: {
      controllerName: "/api/place/{id}",
      actionName: "DELETE_PLACE",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
  },
  ExportLog: {
    postExportLogs: {
      controllerName: "/api/export",
      actionName: "POST_EXPORT",
      requestMethod: RequestMethod.POST,
      requrestBodyType: RequestBodyType.AUTH
    },
    getExportLogs: {
      controllerName: "/api/export",
      actionName: "GET_EXPORT",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    updateExportLogs: {
      controllerName: "/api/export/{id}",
      actionName: "UPDATE_EXPORT",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
    deleteExportLogs: {
      controllerName: "/api/export/{id}",
      actionName: "DELETE_EXPORT",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
  },
  WaterLog: {
    postWaterLogs: {
      controllerName: "/api/water",
      actionName: "POST_WATER",
      requestMethod: RequestMethod.POST,
      requrestBodyType: RequestBodyType.AUTH
    },
    getWaterLogs: {
      controllerName: "/api/water",
      actionName: "GET_WATER",
      requestMethod: RequestMethod.GET,
      requestBodyType: RequestBodyType.AUTH
    },
    updateWaterLogs: {
      controllerName: "/api/water/{id}",
      actionName: "UPDATE_WATER",
      requestMethod: RequestMethod.PUT,
      requestBodyType: RequestBodyType.AUTH
    },
    deleteWaterLogs: {
      controllerName: "/api/water/{id}",
      actionName: "DELETE_WATER",
      requestMethod: RequestMethod.DELETE,
      requestBodyType: RequestBodyType.AUTH
    },
  },
}

type ApiList = typeof apiDetails;
export const apiList: ApiList = apiDetails;