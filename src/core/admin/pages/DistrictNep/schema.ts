import * as yup from 'yup'


export const districtInitialValues = {
    "district_name": "",
};

export const districtValidationSchema = yup.object({
    district_name: yup.mixed().required("नाम आवश्यक छ"),
})