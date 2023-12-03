import * as yup from "yup";

export const IncomeInitialValues = {
  income_title: "",
  rate: 0,
  mood: "",
}

export const IncomeValidationSchema = yup.object({
  income_title: yup.mixed().required("वनको नाम आवश्यक छ"),
  rate: yup.mixed().required("रकम आवश्यक छ")
})