import * as yup from "yup";

export const organizationInitialValues = {
  org_name: "",
  ward_id: 0,
  est_year: "",
  org_type: "",
  samuha_male_no: 0,
  samuha_female_no: 0,
  samuha_other_no: 0,
  mgmt_male_no: 0,
  mgmt_female_no: 0,
  mgmt_other_no: 0,
  address: "",
}

export const organizationValidationSchema = yup.object({
  org_name: yup.mixed().required("नाम आवश्यक छ"),
  ward_id: yup.mixed().required("वडा न. आवश्यक छ"),
  est_year: yup.mixed().required("स्थापना वर्ष आवश्यक छ"),
  org_type: yup.mixed().required("ठेगाना आवश्यक छ"),
})