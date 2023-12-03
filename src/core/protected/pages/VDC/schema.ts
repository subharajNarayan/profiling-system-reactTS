import React from 'react'
import * as yup from "yup";

export const VDCInitialValues = {
  "vdc_name": "",
}

export const VDCValidationSchema = yup.object({
  vdc_name: yup.mixed().required("name is required")
})