import React from 'react'
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux'
import Button from '../../../../../components/UI/Forms/Buttons'
import { useFormik } from 'formik';
import { drinkingInitialValues, drinkingValidationSchema } from './schema';
import FormikValidationError from '../../../../../components/React/FormikValidationError/FormikValidationError';
import { postDrinkingLogsAction } from '../../../../../store/modules/municipality/drinking/postDrinkingLogs';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';
import { updateDrinkingLogsAction } from '../../../../../store/modules/municipality/drinking/updateDrinkingLogs';
import { getDrinkingLogsAction } from '../../../../../store/modules/municipality/drinking/getDrinkingLogs';
import { getWardLogsAction } from '../../../../../store/modules/ward/getWardLogs';
import { RootState } from '../../../../../store/root-reducer';
import axios from 'axios';

interface Props extends PropsFromRedux {
  editData: any,
  setEditData: any
}

const DrinkingForm = (props: Props) => {

  const [initialData, setInitialData] = React.useState<typeof drinkingInitialValues>(
    drinkingInitialValues
  );

  console.log(props.editData, "Drinking");

  const [loader, setLoader] = React.useState(false);

  const dispatch = useDispatch()

  React.useEffect(() => {
    if (props.editData) {
      setInitialData({
        ...props.editData
      })
    }
    dispatch(getWardLogsAction());
    dispatch(getDrinkingLogsAction())
  }, [props.editData, getDrinkingLogsAction])

  const wardData = useSelector((state: RootState) => state.wardData.getWardLogs.data)

  const [ data, setData ] = React.useState([]);
  
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
    validationSchema: drinkingValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {
      let res;

      setLoader(true);

      if (props.editData) {
        res = await props.updateDrinkingLogsAction(props.editData.id, {
          id: props.editData.id,
          ...submitValue
        })
      } else {
        res = await props.postDrinkingLogsAction({
          ...submitValue
        })
      }

      if (res.status === 200 || res.status === 201) {
        if (props.editData) {
          setInitialData(drinkingInitialValues);
          props.setEditData(null)
          toast.success("Data update successful")
          resetForm()
          setLoader(false)
        } else {
          setInitialData(drinkingInitialValues)
          toast.success("Data posted successful")
          resetForm()
          setLoader(false)
        }
      } else {
        toast.error("SERVER ERROR")
      }
    }
  })

  return (
    <div className='drinking-form'>
      <form action="" onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e)
      }}>
        <div className="row">
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">नाम</label>
              <input
                className='form-control'
                name='name'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='name' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">वडा न.</label>
              {/* <select
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
                <option selected>चयन गर्नुहोस्...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select> */}
              {wardData && (
                <select
                  className='form-control'
                  name="ward_id"
                  id='ward_id'
                  value={values.ward_id}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("ward_id", e.target.value);
                  }}
                  onBlur={handleBlur}
                >
                  <option selected>चयन गर्नुहोस्...</option>
                  {wardData.map((item, index) => {
                    return (
                      <option key={index}>{item.ward_number}</option>
                    )
                  })}
                </select>
              )}
              <FormikValidationError name='ward_id' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">लाभान्वित वडाहरु</label>
              <input
                className='form-control'
                name='beneficiary_wards'
                value={values.beneficiary_wards}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='beneficiary_wards' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">लाभान्वित घरसंख्या</label>
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
              <label htmlFor="">निर्माण गर्ने</label>
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
              <label htmlFor="">हालको अवस्था</label>
              <select
                name="current_situation"
                id=""
                className='form-control'
                value={values.current_situation}
                onChange={(e) => {
                  handleChange(e)
                  setFieldValue("current_situation", e.target.value)
                }}
                onBlur={handleBlur}
              >
                <option selected>चयन गर्नुहोस्...</option>
                <option value="१-चालु">१-चालु</option>
                <option value="२-बिग्रेको">२-बिग्रेको</option>
              </select>
              <FormikValidationError name='current_situation' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">निर्माण वर्ष</label>
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
            <div className="button text-right">
              <Button
                className='btn btn-custom mr-2 mt-4'
                text={"पेश गर्नुहोस्"}
                loading={loader}
                disabled={loader}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {
  postDrinkingLogsAction,
  updateDrinkingLogsAction,
  getWardLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(DrinkingForm);