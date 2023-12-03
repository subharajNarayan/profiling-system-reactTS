import React from 'react';
import Button from '../../../../../components/UI/Forms/Buttons';
import { infrastructureInitialValues, infrastructureValidationSchema } from './schema';
import { useFormik } from 'formik';
import FormikValidationError from '../../../../../components/React/FormikValidationError/FormikValidationError';
import { RootState } from '../../../../../store/root-reducer';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { postInfrastructureLogsAction } from '../../../../../store/modules/municipality/infrastructure/postInfrastructureLogs';
import { toast } from 'react-toastify';
import { updateInfrastructureLogsAction } from '../../../../../store/modules/municipality/infrastructure/updateInfrastructureLogs';
import { getWardLogsAction } from '../../../../../store/modules/ward/getWardLogs';
import axios from 'axios';

interface Props extends PropsFromRedux {
  editData: any,
  setEditData: any
}

const InfrastructureForm = (props: Props) => {

  const [initialData, setInitialData] = React.useState<typeof infrastructureInitialValues>(
    infrastructureInitialValues
  );

  const [loader, setLoader] = React.useState(false);

  const dispatch = useDispatch()

  React.useEffect(() => {
    if (props.editData) {
      setInitialData({
        ...props.editData
      })
    }
    dispatch(getWardLogsAction())
  }, [props.editData, getWardLogsAction])

  const wardData = useSelector((state: RootState) => state.wardData.getWardLogs.data)

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialData,
    validationSchema: infrastructureValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {
      let res;

      setLoader(true)
      if (props.editData) {
        res = await props.updateInfrastructureLogsAction(props.editData.id, {
          id: props.editData.id,
          ...submitValue
        })
      } else {
        res = await props.postInfrastructureLogsAction({
          ...submitValue
        })
      }

      if (res.status === 200 || res.status === 201) {
        if (props.editData) {
          props.setEditData(null)
          setInitialData(infrastructureInitialValues)
          toast.success("Data updated successful")
          resetForm()
          setLoader(false)
        } else {
          setInitialData(infrastructureInitialValues)
          toast.success("Data posted successful")
          resetForm()
          setLoader(false)
        }
      } else {
        toast.error("SERVER ERROR")
        resetForm()
      }
    }
  })

  const [data, setData] = React.useState([]);

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
    <div className='infrastructure-form'>
      <form action=""
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(e)
        }}>
        <div className="row">
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">नाम</label>
              <input
                className='form-control'
                name='infra_name'
                value={values.infra_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='infra_name' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">वडा न.</label>
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
              <FormikValidationError name="ward_id" errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">भौतिक पूर्वाधारको प्रकार</label>
              <select
                className='form-control'
                name="infra_type"
                id="infra_type"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.infra_type}
              >
                <option selected>चयन गर्नुहोस्...</option>
                <option value="१-सडक ">१-सडक </option>
                <option value="२-पनि घट्ट">२-पनि घट्ट</option>
                <option value="३-सामुदायिक भवन ">३-सामुदायिक भवन </option>
                <option value="४-पुल">४-पुल</option>
                <option value="५-डेरी">५-डेरी</option>
                <option value="६-भिउ टावर">६-भिउ टावर</option>
                <option value="७-जल्भिद्युत ">७-जल्भिद्युत </option>
                <option value="८-अन्य">८-अन्य</option>

              </select>
              <FormikValidationError name='infra_type' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">पुलको प्रकार</label>
              <select
                className='form-control'
                name="bridge_type"
                id="bridge_type"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bridge_type}
              >
                <option selected>चयन गर्नुहोस्...</option>
                <option value="१-कच्ची पूल ">१-कच्ची पूल </option>
                <option value="२-झुलुङ्गे पूल">२-झुलुङ्गे पूल</option>
                <option value="३-सडक पूल">३-सडक पूल</option>
                <option value="४-अन्य">४-अन्य</option>

              </select>
              {/* <FormikValidationError name='birdge_type' errors={errors} touched={touched} /> */}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">लाभान्वित घरसंख्या</label>
              <input
                className='form-control'
                name='no_of_benefitted'
                value={values.no_of_benefitted}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {/* <FormikValidationError name='no_of_benefitted' errors={errors} touched={touched} /> */}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">लाभान्वित वडाहरू</label>
              <input
                className='form-control'
                name='benefitted_wards'
                value={values.benefitted_wards}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {/* <FormikValidationError name='benefitted_wards' errors={errors} touched={touched} /> */}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">लम्बाई</label>
              <input
                className='form-control'
                name='road_length'
                value={values.road_length}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {/* <FormikValidationError name='road_length' errors={errors} touched={touched} /> */}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">सडकको प्रकार</label>
              <select
                className='form-control'
                name="road_type"
                id="road_type"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.road_type}
              >
                <option selected>चयन गर्नुहोस्...</option>
                <option value="१-सरकारी संस्था">१-सरकारी संस्था</option>
                <option value="२-सामुदायिक वन उपभोक्ता समुह">२-सामुदायिक वन उपभोक्ता समुह</option>
                <option value="३-बचत समुह">३-बचत समुह</option>
                <option value="४-सामाजिक संस्था">४-सामाजिक संस्था</option>
                <option value="५-वित्तिय संस्था">५-वित्तिय संस्था</option>
                <option value="६-खानेपानी उपभोक्ता समुह">६-खानेपानी उपभोक्ता समुह</option>
                <option value="७-धार्मिक संस्था">७-धार्मिक संस्था</option>
                <option value="८-अन्य">८-अन्य</option>

              </select>
              {/* <FormikValidationError name='road_type' errors={errors} touched={touched} /> */}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">क्षमता</label>
              <input
                className='form-control'
                name='capacity'
                value={values.capacity}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {/* <FormikValidationError name='capacity' errors={errors} touched={touched} /> */}
            </div>
          </div>
        </div>
        <div className="button text-right">
          <Button
            className='btn btn-custom mr-2'
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
    state.infrastructureData.postInfrastructureLogs.isFetching ||
    state.infrastructureData.updateInfrastructureLogs.isFetching
});

const mapDispatchToProps = {
  postInfrastructureLogsAction,
  updateInfrastructureLogsAction,
  getWardLogsAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(InfrastructureForm);