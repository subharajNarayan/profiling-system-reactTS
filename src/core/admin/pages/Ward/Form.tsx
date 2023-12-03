import React from 'react'
import { ConnectedProps, connect } from 'react-redux'
import { WardInitialValues, WardValidationSchema } from './schema'
import { useFormik } from 'formik'
import FormikValidationError from '../../../../components/React/FormikValidationError/FormikValidationError'
import Button from '../../../../components/UI/Forms/Buttons'
import { RootState } from '../../../../store/root-reducer'
import { toast } from 'react-toastify'
import { postWardLogsAction } from '../../../../store/modules/ward/postWardLogs';
import { updateWardLogsAction } from '../../../../store/modules/ward/updateWardLogs';

interface Props extends PropsFromRedux{
  editData: any,
  setEditData: any,
}

const WardForm = (props:Props) => {

  const [ initialData, setInitialData ] = React.useState<typeof WardInitialValues>(
    WardInitialValues
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
    validationSchema: WardValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {

      let res;
      
      const requestData = {
        ...submitValue,
        ward_number: parseInt(submitValue.ward_number)
      }
      console.log({ID:requestData});

      if (props.editData) {
        res = await props.updateWardLogsAction(props.editData.ward_id, {
          ...requestData
        })
        
      } else {
        res = await props.postWardLogsAction(requestData);
      }

      if (res.status === 201 || res.status === 200) {
        if (props.editData) {
          // props.setEditData(null)
          setInitialData({ ...initialData, ward_number: '' });
          toast.success("Data Updated Successful")
          console.log(res,"ID");
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

  console.log(props.loading, "LOADING");
  
  return (
    <div className='ward-form'>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group ">
              <label htmlFor="" className="mr-1">
                वडा नम्बर:
              </label>

              <input
                className="form-control"
                name="ward_number"
                value={values.ward_number}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name="ward_number" errors={errors} touched={touched} />
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
    state.wardData.postWardLogs.isFetching ||
    state.wardData.updateWardLogs.isFetching
})

const mapDispatchToProps = {
  postWardLogsAction,
  updateWardLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(WardForm);