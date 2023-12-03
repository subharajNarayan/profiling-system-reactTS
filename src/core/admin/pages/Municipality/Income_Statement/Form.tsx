import React from 'react'
import Button from '../../../../../components/UI/Forms/Buttons';
import { IncomeInitialValues, IncomeValidationSchema } from './schema';
import { useFormik } from 'formik';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';
import FormikValidationError from '../../../../../components/React/FormikValidationError/FormikValidationError';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../../../../../store/root-reducer';
import { postIncomeLogsAction } from '../../../../../store/modules/municipality/income-statement/postIncomeLogs';
import { updateIncomeLogsAction } from '../../../../../store/modules/municipality/income-statement/updateIncomeLogs';

interface Props extends PropsFromRedux {
  editData: any;
  setEditData: any;
}

const IncomeForm = (props: Props) => {

  const [initialData, setInitialData] = React.useState<typeof IncomeInitialValues>(
    IncomeInitialValues
  )

  const [loader, setLoader] = React.useState(false);

  React.useEffect(() => {
    if (props.editData) {
      setInitialData({
        ...props.editData
      })
    }
  }, [props.editData])

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialData,
    validationSchema: IncomeValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {

      let res;
      setLoader(true)

      if (props.editData) {
        res = await props.updateIncomeLogsAction(props.editData.id, {
          ...submitValue
        })
      } else {
        res = await props.postIncomeLogsAction({
          ...submitValue
        })
      }


      if (res.status === 201 || res.status === 200) {
        if (props.editData) {
          props.setEditData(null)
          setInitialData(IncomeInitialValues);
          toast.success("Data updated successful!!")
          resetForm()
          setLoader(false)
        } else {
          setInitialData(IncomeInitialValues)
          toast.success("Data posted successful!!")
          resetForm()
          setLoader(false)
        }
      } else {
        toast.success("SERVER ERROR")
      }
    }
  })


  return (
    <div className='forest-form mt-4'>
      <form action="" onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(e)
       }}>
        <div className="row">
          <div className="col-lg-4">
            <div className="form-group">
              <label htmlFor="">आय शीर्षक</label>
              <select
                className='form-control'
                name="income_title"
                value={values.income_title}
                onChange={(e) => {
                  handleChange(e)
                  setFieldValue("income_title", e.target.value)
                }}
                onBlur={handleBlur}
              >
                <option value="selected">चयन गर्नुहोस्...</option>
                <option value="१-नेपाल सरकारको विकास अनुदान">१-नेपाल सरकारको विकास अनुदान</option>
                <option value="२-मालपोत">२-मालपोत</option>
                <option value="३-ठेक्का कर">३-ठेक्का कर</option>
                <option value="४-निवेदन कर">४-निवेदन कर</option>
                <option value="५-जग्गा मुल्यांग्कन कर">५-जग्गा मुल्यांग्कन कर</option>
                <option value="६-सिफारिस दस्तुर">६-सिफारिस दस्तुर</option>
                <option value="७-टेलिफोन">७-टेलिफोन</option>
                <option value="८-जिविस अनुदान">८-जिविस अनुदान</option>
                <option value="९-घरभाडा">९-घरभाडा</option>
                <option value="१०-अन्य">१०-अन्य</option>
              </select>

              <FormikValidationError name='income_title' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="rate">रकम</label>
              <input
                className='form-control'
                name='rate'
                value={values.rate}
                onChange={handleChange}
              />
              <FormikValidationError name='rate' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="mood">कैफियत</label>
              <input
                className='form-control'
                name='mood'
                value={values.mood}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-2 button text-right">
            <Button
              className='btn btn-custom mr-2 mt-4'
              text={"पेश गर्नुहोस्"}
              loading={loader}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
})

const mapDispatchToProps = {
  postIncomeLogsAction,
  updateIncomeLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(IncomeForm);