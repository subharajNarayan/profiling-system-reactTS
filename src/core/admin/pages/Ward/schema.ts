import React from 'react'
import * as yup from "yup";

export const WardInitialValues = {
  "ward_number": "",
}

export const WardValidationSchema = yup.object({
  ward_number: yup.mixed().required("संख्या आवश्यक छ")
})