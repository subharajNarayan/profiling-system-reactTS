import * as yup from "yup";

export const placeInitialValues = {
  placename: "",
  ward_id: 0,
  place_type: "",
  place_area: 0,
  ownership: "",
  accessby: "",
  hotelno: 0,
  distance: 0,
  tourist_internal: 0,
  tourist_foreign: 0,
  revenue: 0,
  annual_prgm_no: 0
}

export const placeValidationSchema = yup.object({
  placename: yup.mixed().required("नाम आवश्यक छ"),
  ward_id: yup.mixed().required("वडा न. आवश्यक छ"),
  place_type: yup.mixed().required("स्थानको प्रकार आवश्यक छ"),
  place_area: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  hotelno: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  distance: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  tourist_internal: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  tourist_foreign: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  revenue: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  annual_prgm_no: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
})