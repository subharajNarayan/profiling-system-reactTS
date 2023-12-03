import * as yup from "yup";

export const infrastructureInitialValues = {
  infra_name: "",
  ward_id: 0,
  infra_type: "",
  no_of_benefitted: 0,
  road_length: 0,
  benefitted_wards: "",
  bridge_type: "",
  road_type: "",
  capacity: "",
}

export const infrastructureValidationSchema = yup.object({
  infra_name: yup.mixed().required("नाम आवश्यक छ"),
  ward_id: yup.mixed().required("वडा न. आवश्यक छ"),
  infra_type: yup.mixed().required("भौतिक पूर्वाधार आवश्यक छ"),
  // no_of_benefitted: yup.mixed().required("आवश्यक छ"),
  // road_length: yup.mixed().required("आवश्यक छ"),
  // benefitted_wards: yup.mixed().required("आवश्यक छ"),
  // bridge_type: yup.mixed().required("आवश्यक छ"),
  // road_type: yup.mixed().required("आवश्यक छ"),
  // capacity: yup.mixed().required("आवश्यक छ"),
})