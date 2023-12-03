import * as yup from "yup";

export const disasterInitialValues = {
  disaster_name: "",
  disaster_type: "",
  disaster_reason: "",
  disaster_area: 0,
  disaster_effect: "",
  disaster_prevention: "",
  disasterWard: "",
  disasterYear: ""
}

export const disasterValidationSchema = yup.object({
  disaster_name: yup.mixed().required("वातावरणीय प्रकोपको नाम आवश्यक छ"),
  disaster_type: yup.mixed().required("प्रकोपको प्रकार आवश्यक छ")
})
