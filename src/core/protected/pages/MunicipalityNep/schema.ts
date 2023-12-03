import * as yup from 'yup'


export const municipalityInitialValues = {
    "munici_name": "",
    "munici_type": "",
};

export const municipalityValidationSchema = yup.object({
    munici_name: yup.mixed().required("name is required"),
    munici_type: yup.mixed().required("type is required")
})