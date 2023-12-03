import * as yup from 'yup'


export const provinceInitialValues = {
    "state_name": "",
};

export const provinceValidationSchema = yup.object({
    state_name: yup.mixed().required("name is required"),
})