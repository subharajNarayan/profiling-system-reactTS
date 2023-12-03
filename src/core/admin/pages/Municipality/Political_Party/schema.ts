import * as yup from "yup";

export const politicalInitialValues = {
  politicsname: "",
  comm_male: 0,
  comm_female: 0,
  comm_other: 0,
  reli_male: 0,
  reli_female: 0,
  reli_other: 0,
  dalit_male: 0,
  dalit_female: 0,
  dalit_other: 0,
  tribes_male: 0,
  tribes_female: 0,
  tribes_other: 0,
  other_male: 0,
  other_female: 0,
  other_other:0
}

export const politicalValidationSchema = yup.object({
  politicsname: yup.mixed().required("नाम आवश्यक छ"),
  comm_male: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  comm_female: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  comm_other: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  reli_male: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  reli_female: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  reli_other: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  dalit_male: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  dalit_female: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  dalit_other: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  tribes_male: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  tribes_female: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  tribes_other: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  other_male: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  other_female: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  other_other: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
})