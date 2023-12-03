import React from 'react'
import { ConnectedProps, connect } from 'react-redux'
import { VDCInitialValues, VDCValidationSchema } from './schema'
import { useFormik } from 'formik'
import FormikValidationError from '../../../../components/React/FormikValidationError/FormikValidationError'
import Button from '../../../../components/UI/Forms/Buttons'
import { postVDCLogsAction } from '../../../../store/modules/vdc/postVDCLogs'
import { RootState } from '../../../../store/root-reducer'
import { toast } from 'react-toastify'
import { updateVDCLogsAction } from '../../../../store/modules/vdc/updateVDCLogs'

interface Props extends PropsFromRedux{
  editData: any,
  setEditData: any
}

const VDCForm = (props:Props) => {

  const [ initialData, setInitialData ] = React.useState<typeof VDCInitialValues>(
    VDCInitialValues
  )

  React.useEffect(() => {
    if (props.editData) {
      setInitialData({
        ...props.editData
      })
    }
  },[props.editData]);


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
    validationSchema: VDCValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {

      let res;
      
      if (props.editData) {
        res = await props.updateVDCLogsAction(props.editData.id, {
          ...submitValue
        })
      } else {
        res = await props.postVDCLogsAction({
          ...submitValue
        });
      }

      if (res.status === 201 || res.status === 200) {
        if (props.editData) {
          props.setEditData(null)
          toast.success("Data Updated Successful")
          resetForm()
        } else {
          toast.success("Data Posted Successful")
          resetForm()
        }
      } else {
        toast.error("SERVER ERROR")
      }
      
    }
  })

  return (
    <div className='vdc-form'>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group ">
              <label htmlFor="" className="mr-1">
                VDC Name:
              </label>

              <input
                className="form-control"
                name="vdc_name"
                value={values.vdc_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name="vdc_name" errors={errors} touched={touched} />
            </div>
          </div>
        </div>
        <div className='button text-right'>
          <Button
            className="btn custom-btn  mr-2"
            text={"SAVE"}
            disabled={props.loading}
            loading={props.loading}
          />
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  loading:
    state.vdcData.postVDCLogs.isFetching ||
    state.vdcData.updateVDCLogs.isFetching
})

const mapDispatchToProps = {
  postVDCLogsAction,
  updateVDCLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(VDCForm);