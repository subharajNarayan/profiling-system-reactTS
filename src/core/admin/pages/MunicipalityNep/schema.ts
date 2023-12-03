import * as yup from 'yup'


export const municipalityInitialValues = {
    munici_name: "",
    munici_type: "",
};

export const municipalityValidationSchema = yup.object({
    munici_name: yup.mixed().required("नाम आवश्यक छ"),
    munici_type: yup.mixed().required("प्रकार आवश्यक छ")
})