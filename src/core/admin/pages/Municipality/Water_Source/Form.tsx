import React from 'react'
import Button from '../../../../../components/UI/Forms/Buttons';
import { waterInitialValues, waterValidationSchema } from './schema';
import { useFormik } from 'formik';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';
import FormikValidationError from '../../../../../components/React/FormikValidationError/FormikValidationError';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../../../../../store/root-reducer';
import { postWaterLogsAction } from '../../../../../store/modules/municipality/water-source/postWaterLogs';
import { updateWaterLogsAction } from '../../../../../store/modules/municipality/water-source/updateWaterLogs';

interface Props extends PropsFromRedux {
  editData: any;
  setEditData: any;
}

const WaterForm = (props: Props) => {

  const [initialData, setInitialData] = React.useState<typeof waterInitialValues>(
    waterInitialValues
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
    validationSchema: waterValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {

      let res;
      setLoader(true)

      if (props.editData) {
        res = await props.updateWaterLogsAction(props.editData.id, {
          ...submitValue
        })
      } else {
        res = await props.postWaterLogsAction({
          ...submitValue
        })
      }


      if (res.status === 201 || res.status === 200) {
        if (props.editData) {
          props.setEditData(null)
          setInitialData(waterInitialValues);
          toast.success("Data updated successful!!")
          resetForm()
          setLoader(false)
        } else {
          setInitialData(waterInitialValues)
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
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="watername">नाम <span style={{ color: "red" }}>*</span></label>
              <input
                className='form-control'
                name='watername'
                value={values.watername}
                onChange={handleChange}
              />
              <FormikValidationError name='watername' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">जलस्रोतको प्रकार<span style={{ color: "red" }}>*</span></label>
              <select
                className='form-control'
                name="water_res_type"
                value={values.water_res_type}
                onChange={(e) => {
                  handleChange(e)
                  setFieldValue("water_res_type", e.target.value)
                }}
                onBlur={handleBlur}
              >
                <option value="selected">चयन गर्नुहोस्...</option>
                <option value="१-खोल्सा">१-खोल्सा</option>
                <option value="२-इनार">२-इनार</option>
                <option value="३-नदि">३-नदि</option>
                <option value="४-ताल/पोखरी">४-ताल/पोखरी</option>
                <option value="५-सिमसार क्षेत्र">५-सिमसार क्षेत्र</option>
                <option value="६-मुल/मुहान">६-मुल/मुहान</option>
              </select>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="water_ward">समेटेका वडाहरु</label>
              <input
                className='form-control'
                name='water_ward'
                value={values.water_ward}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">उपयोगको विवरण</label>
              <input
                className='form-control'
                name='usage_details'
                value={values.usage_details}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">गा.वि.स भित्रको लम्बाई/क्षेत्रफल(मि/हे)</label>
              <input
                className='form-control'
                name='area'
                value={values.area}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='area' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">हालको अवस्था</label>
              <select
                className='form-control'
                name="current_status"
                value={values.current_status}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="selected">चयन गर्नुहोस्...</option>
                <option value="१-सुरक्षित">१-सुरक्षित</option>
                <option value="२-त्यसै छोदिएको">२-त्यसै छोदिएको</option>
              </select>
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
  postWaterLogsAction,
  updateWaterLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(WaterForm);