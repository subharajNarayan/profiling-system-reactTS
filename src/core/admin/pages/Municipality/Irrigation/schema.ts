import * as yup from "yup";

export const irrigationInitialValues = {
  irri_name: "",
  irri_type: "",
  irri_period: "",
  households_benefited_no: 0,
  builtBy: "",
  builtYear: "",
  irri_area: "",
  current_situation: "",
  beneficiary_wards: "",
}

export const irrigationValidationSchema = yup.object({
  irri_name: yup.mixed().required("सिचाई नाम आवश्यक छ"),
})