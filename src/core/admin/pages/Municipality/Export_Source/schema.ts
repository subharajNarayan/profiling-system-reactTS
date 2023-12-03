import * as yup from "yup";

export const exportInitialValues = {
  exportward_id: 0,
  export_res_type: 0,
  export_material_type: 0,
  export_material_name: "",
  export_qty: 0,
  export_amnt: 0
}

export const exportValidationSchema = yup.object({
  exportward_id: yup.mixed().required("वडा न. आवश्यक छ"),
  export_res_type: yup.mixed().required("निकासीजन्यको प्रकार आवश्यक छ"),
  export_material_type: yup.mixed().required("स्रोतको प्रकार आवश्यक छ"),
  export_qty: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
  export_amnt: yup.string().matches(/^\d+$/, 'कृपया केवल संख्या प्रविष्ट गर्नुहोस्'),
})