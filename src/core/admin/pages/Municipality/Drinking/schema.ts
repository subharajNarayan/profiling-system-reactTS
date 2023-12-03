import * as yup from "yup";

export const drinkingInitialValues = {
  name: "",
  ward_id: 0,
  beneficiary_wards: "",
  households_benefited_no: 0,
  builtBy: "",
  current_situation: "",
  builtYear: "",
}

export const drinkingValidationSchema = yup.object({
  name: yup.mixed().required("नाम आवश्यक छ"),
  ward_id: yup.mixed().required("वडा न. आवश्यक छ"),
  current_situation: yup.mixed().required("हालको अवस्था आवश्यक छ"),
})