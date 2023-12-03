import React from 'react'
import { ConnectedProps, connect } from 'react-redux'
import Button from '../../../../../components/UI/Forms/Buttons'
import { useFormik } from 'formik';
import { irrigationInitialValues, irrigationValidationSchema } from './schema';
import FormikValidationError from '../../../../../components/React/FormikValidationError/FormikValidationError';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';
import { RootState } from '../../../../../store/root-reducer';
import { postIrrigationLogsAction } from '../../../../../store/modules/municipality/irrigation/postIrrigationLogs';
import { updateIrrigationLogsAction } from '../../../../../store/modules/municipality/irrigation/updateIrrigationLogs';

interface Props extends PropsFromRedux {
  editData: any,
  setEditData: any
}

const IrrigationForm = (props: Props) => {

  const [initialData, setInitialData] = React.useState<typeof irrigationInitialValues>(
    irrigationInitialValues
  );

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
    setFieldValue
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialData,
    validationSchema: irrigationValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {
      let res;

      console.log("form submitted", submitValue);


      setLoader(true);

      if (props.editData) {
        res = await props.updateIrrigationLogsAction(props.editData.id, {
          id: props.editData.id,
          ...submitValue
        })
      } else {
        res = await props.postIrrigationLogsAction({
          ...submitValue
        })
      }

      if (res.status === 200 || res.status === 201) {
        resetForm()
        setLoader(false)
        if (props.editData) {
          props.setEditData(null)
          setInitialData(irrigationInitialValues);
          toast.success("Data update successful")
        } else {
          setInitialData(irrigationInitialValues)
          toast.success("Data posted successful")
        }
      } else {
        toast.error("SERVER ERROR")
      }
    }
  })

  return (
    <div className='irrigation-form'>
      <form action="" onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e)
      }}>
        <div className="row">
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="irri_name">नाम</label>
              <input
                className='form-control'
                name='irri_name'
                value={values.irri_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='irri_name' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="irri_type">सिचाईको प्रकार</label>
              <select
                className='form-control'
                name="irri_type"
                value={values.irri_type}
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("irri_type", e.target.value)
                }}
              >
                <option value="selected" key="default">चयन गर्नुहोस्...</option>
                <option value="१-थोपा सिचाई ">१-थोपा सिचाई </option>
                <option value="२-कुलो नहर">२-कुलो नहर</option>
                <option value="३-पोखरी सिचाई">३-पोखरी सिचाई</option>
                <option value="४-टयुबवेल">४-टयुबवेल</option>
                <option value="५-डिप टयुबवेल">५-डिप टयुबवेल</option>
                <option value="६-स्प्रिंङकल">६-स्प्रिंङकल</option>
                <option value="७-वर्षात ">७-वर्षात </option>
              </select>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="irri_period">सिचाई अवधि</label>
              <select
                className='form-control'
                name="irri_period"
                value={values.irri_period}
                onChange={(e) => {
                  handleChange(e)
                  setFieldValue("irri_period", e.target.value)
                }}
                onBlur={handleBlur}
              >
                <option value="selected" key="default">चयन गर्नुहोस्...</option>
                <option value="१-बर्षभरी ">१-बर्षभरी </option>
                <option value="२-आशिक">२-आशिक</option>
              </select>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="builtBy">निर्माण गर्ने</label>
              <input
                className='form-control'
                name='builtBy'
                value={values.builtBy}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="builtYear">निर्माण मिति (वर्ष)</label>
              <input
                className='form-control'
                name='builtYear'
                value={values.builtYear}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="current_situation">हालको अवस्था</label>
              <select
                name="current_situation"
                className='form-control'
                value={values.current_situation}
                onChange={(e) => {
                  handleChange(e)
                  setFieldValue("current_situation", e.target.value)
                }}
                onBlur={handleBlur}
              >
                <option value="selected" key="default">चयन गर्नुहोस्...</option>
                <option value="१-चालु">१-चालु</option>
                <option value="२-बिग्रेको">२-बिग्रेको</option>
              </select>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="irri_area">शिक्षित क्षेत्रफल</label>
              <input
                className='form-control'
                name='irri_area'
                value={values.irri_area}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="households_benefited_no">लाभान्वित घरसंख्या</label>
              <input
                className='form-control'
                name='households_benefited_no'
                value={values.households_benefited_no}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="beneficiary_wards">लाभान्वित वडाहरु</label>
              <input
                className='form-control'
                name='beneficiary_wards'
                value={values.beneficiary_wards}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>
            <div className="button text-right">
              <Button
                className='btn btn-custom mr-2 mt-4'
                text={"पेश गर्नुहोस्"}
                loading={loader}
                disabled={loader}
              />
            </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  loading: state.irrigationData.postIrrigationLogs.isFetching
})

const mapDispatchToProps = {
  postIrrigationLogsAction,
  updateIrrigationLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(IrrigationForm);