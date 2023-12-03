import * as yup from "yup";

export const forestInitialValues = {
  forest_name: "",
  ward_id: 0,
  forest_type: "",
  forest_res: "",
  area: 0,
  forest_graze: "",
  forest_theft: "",
  forest_households: 0,
}

export const forestValidationSchema = yup.object({
  forest_name: yup.mixed().required("वनको नाम आवश्यक छ"),
  ward_id: yup.mixed().required("वडा न. आवश्यक छ")
})