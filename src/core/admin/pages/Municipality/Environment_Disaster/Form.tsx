import React from 'react'
import Button from '../../../../../components/UI/Forms/Buttons';
import { useFormik } from 'formik';
import { RootState } from '../../../../../store/root-reducer';
import { ConnectedProps, connect } from 'react-redux';
import { disasterInitialValues, disasterValidationSchema } from './schema';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';
import FormikValidationError from '../../../../../components/React/FormikValidationError/FormikValidationError';
import { updateDisasterLogsAction } from '../../../../../store/modules/municipality/environment-disaster/updateDisasterLogs';
import { postDisasterLogsAction } from '../../../../../store/modules/municipality/environment-disaster/postDisasterLogs';

interface Props extends PropsFromRedux {
  editData: any;
  setEditData: any;
}

const EnvironmentDisasterForm = (props: Props) => {

  const [initialData, setInitialData] = React.useState<typeof disasterInitialValues>(
    disasterInitialValues
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
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialData,
    validationSchema: disasterValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {

      let res;
      setLoader(true)

      if (props.editData) {
        res = await props.updateDisasterLogsAction(props.editData.id, {
          ...submitValue
        })
      } else {
        res = await props.postDisasterLogsAction({
          ...submitValue
        })
      }

      if (res.status === 201 || res.status === 200) {
        if (props.editData) {
          props.setEditData(null)
          setInitialData(disasterInitialValues);
          toast.success("Data updated successful!!")
          setLoader(false)
          resetForm()
        } else {
          setInitialData(disasterInitialValues)
          toast.success("Data posted successful!!")
          resetForm()
          setLoader(false)
        }
      } else {
        toast.success("SERVER ERROR")
        setLoader(false)
      }
    }
  })

  return (
    <div className='disaster-form'>
      <form action="" onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(e)
      }}>
        <div className="row">
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="disaster_name">ठाउँको नाम</label>
              <input
                className='form-control'
                name='disaster_name'
                value={values.disaster_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='disaster_name' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">प्रकोपको प्रकार</label>
              <select
                className='form-control'
                name="disaster_type"
                value={values.disaster_type}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="selected">चयन गर्नुहोस्...</option>
                <option value="१-भुक्षय">१-भुक्षय</option>
                <option value="२-पहिरो">२-पहिरो</option>
                <option value="३-डडेलो">३-डडेलो</option>
                <option value="४-आगलागी">४-आगलागी</option>
                <option value="५-बादी">५-बादी</option>
                <option value="६-सुक्खा">६-सुक्खा</option>
                <option value="७-रोगकिरा">७-रोगकिरा</option>
                <option value="८-अन्य">८-अन्य</option>
              </select>
              <FormikValidationError name='disaster_type' errors={errors} touched={touched} />

            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="disaster_reason">कारण</label>
              <input
                className='form-control'
                name='disaster_reason'
                value={values.disaster_reason}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="disaster_area">प्रभावित क्षेत्रफल (हेक्टर)</label>
              <input
                className='form-control'
                name='disaster_area'
                value={values.disaster_area}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="disaster_effect">समुदायमा पर्ने असर</label>
              <input
                className='form-control'
                name='disaster_effect'
                value={values.disaster_effect}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="disaster_prevention">रोकथामको उपाय</label>
              <input
                className='form-control'
                name="disaster_prevention"
                value={values.disaster_prevention}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="disasterWard">प्रभावित वडा</label>
              <input
                className='form-control'
                name='disasterWard'
                value={values.disasterWard}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="disasterYear">प्रकोप भएको वर्ष</label>
              <input
                className='form-control'
                name='disasterYear'
                value={values.disasterYear}
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
          />
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({

})

const mapDispatchToProps = {
  postDisasterLogsAction,
  updateDisasterLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(EnvironmentDisasterForm);