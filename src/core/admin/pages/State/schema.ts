import * as yup from 'yup'


export const provinceInitialValues = {
    "state_name": "",
};

export const provinceValidationSchema = yup.object({
    state_name: yup.mixed().required("नाम आवश्यक छ"),
})