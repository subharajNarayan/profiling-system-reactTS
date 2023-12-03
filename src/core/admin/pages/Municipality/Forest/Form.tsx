import React from 'react'
import Button from '../../../../../components/UI/Forms/Buttons';
import { forestInitialValues, forestValidationSchema } from './schema';
import { useFormik } from 'formik';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';
import FormikValidationError from '../../../../../components/React/FormikValidationError/FormikValidationError';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/root-reducer';
import { getWardLogsAction } from '../../../../../store/modules/ward/getWardLogs';
import axios from 'axios';
import { postForestLogsAction } from '../../../../../store/modules/municipality/forest/postForestLogs';
import { updateForestLogsAction } from '../../../../../store/modules/municipality/forest/updateForestLogs';

interface Props extends PropsFromRedux {
  editData: any;
  setEditData: any;
}

const ForestForm = (props: Props) => {

  const [initialData, setInitialData] = React.useState<typeof forestInitialValues>(
    forestInitialValues
  )

  const [loader, setLoader] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (props.editData) {
      setInitialData({
        ...props.editData
      })
    }
    dispatch(getWardLogsAction())
  }, [props.editData, getWardLogsAction])

  const wardsData = useSelector((state: RootState) => state.wardData.getWardLogs.data)

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
    validationSchema: forestValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {

      let res;
      setLoader(true)

      if (props.editData) {
        res = await props.updateForestLogsAction(props.editData.forest_id, {
          ...submitValue
        })
      } else {
        res = await props.postForestLogsAction({
          ...submitValue
        })
      }

      if (res.status === 201 || res.status === 200) {
        if (props.editData) {
          props.setEditData(null)
          setInitialData(forestInitialValues);
          toast.success("Data updated successful!!")
          resetForm()
          setLoader(false)
        } else {
          setInitialData(forestInitialValues)
          toast.success("Data posted successful!!")
          resetForm()
          setLoader(false)
        }
      } else {
        toast.success("SERVER ERROR")
      }
    }
  })


  const [data, setData] = React.useState([]);
  console.log({ data });

  // Not using anywhere but it just to view/Fetch data
  React.useEffect(() => {
    // Fetch data using Axios when the component mounts
    axios.get('http://localhost:8080/api/ward') // Replace with API endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='forest-form'>
      <form action="" onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(e)
      }}>
        <div className="row">
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="forest_name">नाम</label>
              <input
                className='form-control'
                name='forest_name'
                value={values.forest_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='forest_name' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-2">
            <div className="form-group">
              <label htmlFor="">वडा न.</label>
              <select
                className='form-control'
                name="ward_id"
                id='ward_id'
                value={values.ward_id}
                onChange={(e) => {
                  handleChange(e)
                  setFieldValue("ward_id", e.target.value)
                }}
                onBlur={handleBlur}
              >
                <option value="selected">चयन गर्नुहोस्...</option>
                {wardsData && wardsData.map((item, index) => {
                  return (
                    <option key={index}>{item.ward_number}</option>
                  )
                })}
              </select>

              <FormikValidationError name="ward_id" errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="forest_type">वनको किसिम</label>
              <select
                className='form-control'
                name="forest_type"
                id='forest_type'
                value={values.forest_type}
                // onChange={(e) => {
                //   handleChange(e);
                //   setFieldValue("forest_type", e.target.value)
                // }}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="selected">चयन गर्नुहोस्...</option>
                <option value="१-निजी ">१-निजी </option>
                <option value="२-सरकारी">२-सरकारी</option>
                <option value="३-सामुदायिक">३-सामुदायिक</option>
                <option value="४-कबुलियती">४-कबुलियती</option>
                <option value="५-धार्मिक">५-धार्मिक</option>
              </select>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="forest_res">वनपैदावर</label>
              <input
                className='form-control'
                name='forest_res'
                value={values.forest_res}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="area">क्षेत्रफल (हेक्टर)</label>
              <input
                className='form-control'
                name='area'
                value={values.area}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="forest_graze">खुल्ला चरिचरन</label>
              <select
                className='form-control'
                name="forest_graze"
                value={values.forest_graze}
                // onChange={(e) => {
                //   handleChange(e);
                //   setFieldValue("forest_graze", e.target.value)
                // }}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="selected" key="default">चयन गर्नुहोस्...</option>
                <option value="१-छ ">१-छ </option>
                <option value="२-छैन">२-छैन</option>
              </select>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="forest_theft">चोरी सिकारी</label>
              <select
                name="forest_theft"
                className='form-control'
                value={values.forest_theft}
                // onChange={(e) => {
                //   handleChange(e);
                //   setFieldValue("forest_theft", e.target.value);
                // }}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="selected" key="default">चयन गर्नुहोस्...</option>
                <option value="१-छ">१-छ</option>
                <option value="२-छैन">२-छैन</option>
              </select>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="forest_households">घरसंख्या</label>
              <input
                className='form-control'
                name='forest_households'
                value={values.forest_households}
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
  loading:
    state.forestData.postForestLogs.isFetching ||
    state.forestData.updateForestLogs.isFetching
})

const mapDispatchToProps = {
  postForestLogsAction,
  updateForestLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ForestForm);