import * as yup from "yup";

export const schoolInitialValues = {
  schoolname: "",
  ward_id: 0,
  est_date: 0,
  schooltype: "",
  schoollvl: "",
  admit_rate: 0,
  school_leaving_rate: 0,
  temp_building_no: 0,
  temp_class_no: 0,
  perm_building_no: 0,
  perm_class_no: 0,
  toilet_type: "",
  toilet_no: 0,
  drinking_service: "",
  mgmt_male: 0,
  mgmt_female: 0,
  mgmt_other: 0,
}

export const schoolValidationSchema = yup.object({
  schoolname: yup.mixed().required("नाम आवश्यक छ"),
  ward_id: yup.mixed().required("वडा न. आवश्यक छ"),
  est_date: yup.mixed().required("स्थापना वर्ष आवश्यक छ"),
  schooltype: yup.mixed().required("विद्यालय प्रकार आवश्यक छ"),
  schoollvl: yup.mixed().required("विद्यालय तह आवश्यक छ")
})