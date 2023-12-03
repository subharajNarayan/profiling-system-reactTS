import * as yup from "yup";

export const waterInitialValues = {
  watername: "",
  water_ward: "",
  water_res_type: "",
  usage_details: "",
  area: 0,
  current_status: "",
}

export const waterValidationSchema = yup.object({
  watername: yup.mixed().required("जलको नाम आवश्यक छ"),
  water_ward: yup.mixed().required("जलको वडा न. आवश्यक छ"),
  area: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
})