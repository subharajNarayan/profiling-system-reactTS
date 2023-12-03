import * as yup from "yup";

export const industryInitialValues = {
  industryname: "",
  industryward_id: 0,
  industry_type: "",
  industry_currentstatus: "",
  industry_product: "",
  industry_income: 0,
  emp_male: 0,
  emp_female: 0,
  emp_other: 0,
}

export const industryValidationSchema = yup.object({
  industryname: yup.mixed().required("नाम आवश्यक छ"),
  industryward_id: yup.mixed().required("वडा न. आवश्यक छ"),
  industry_type: yup.mixed().required("उद्योगको प्रकार आवश्यक छ"),
  industry_currentstatus: yup.mixed().required("हालको अवस्था आवश्यक छ"),
  industry_income: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  emp_male: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  emp_female: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  emp_other: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
})