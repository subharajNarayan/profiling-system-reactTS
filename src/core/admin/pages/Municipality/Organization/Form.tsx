import React from 'react';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { organizationInitialValues, organizationValidationSchema } from './schema';
import { RootState } from '../../../../../store/root-reducer';
import Button from '../../../../../components/UI/Forms/Buttons';
import FormikValidationError from '../../../../../components/React/FormikValidationError/FormikValidationError';
import { postOrganizationLogsAction } from '../../../../../store/modules/municipality/organization/postOrganizationLogs';
import { getWardLogsAction } from '../../../../../store/modules/ward/getWardLogs';
import { updateOrganizationLogsAction } from '../../../../../store/modules/municipality/organization/updateOrganizationLogs';
import axios from 'axios';

interface Props extends PropsFromRedux {
  editData: any,
  setEditData: any,
}

const OrganizationForm = (props: Props) => {

  const [initialData, setInitialData] = React.useState<typeof organizationInitialValues>(
    organizationInitialValues
  );

  const dispatch = useDispatch();

  const [ loader, setLoader ] = React.useState(false);

  React.useEffect(() => {
    if (props.editData) {
      setInitialData({
        ...props.editData
      })
    }
    dispatch(getWardLogsAction())
  }, [props.editData]);

  const wardDetails = useSelector((state: RootState) => state.wardData.getWardLogs.data);


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
    validationSchema: organizationValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {
      let res;
      setLoader(true);
      if (props.editData) {
        res = await props.updateOrganizationLogsAction(props.editData.id, {
          id: props.editData.id,
          ...submitValue
        })
      } else {
        res = await props.postOrganizationLogsAction({
          ...submitValue,
        })
      }

      if (res.status === 201 || res.status === 200) {
        if (props.editData) {
          props.setEditData(null)
          setInitialData(organizationInitialValues)
          toast.success("Data updated successful")
          resetForm()
          setLoader(false);
        } else {
          setInitialData(organizationInitialValues)
          toast.success("Data posted successful")
          resetForm()
          setLoader(false)
        }
      } else {
        toast.error("SERVER ERROR")
      }
    }
  });

  const [ data, setData ] = React.useState([]);
  console.log({data});
  
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
    <div className='municipality-form'>
      <form action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <div className="row">
          <div className="col-lg-4">
            <div className="form-group">
              <label htmlFor="">नाम</label>
              <input
                className='form-control'
                name='org_name'
                value={values.org_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name="org_name" errors={errors} touched={touched} />
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
                  handleChange(e);
                  setFieldValue("ward_id", e.target.value);
                }}
                onBlur={handleBlur}
              >
                <option selected>चयन गर्नुहोस्...</option>
                {wardDetails && wardDetails.map((item, index) => {
                  return (
                    <option key={index}>{item.ward_number}</option>
                  )
                })}
              </select>

              <FormikValidationError name="ward_id" errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-2">
            <div className="form-group">
              <label htmlFor="">स्थापना वर्ष</label>
              <input
                className='form-control'
                name='est_year'
                value={values.est_year}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name="est_year" errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <label htmlFor="">संस्था प्रकार</label>
              <select
                name="org_type"
                id="org_type"
                value={values.org_type}
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e)
                  setFieldValue("org_type", e.target.value);
                }}
                className='form-control'
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
              <FormikValidationError name="org_type" errors={errors} touched={touched} />
            </div>
          </div>
        </div>
        <div className="row organization-group-number">
          <div className="col-lg-4">
            <div className="form-group">
              <label htmlFor="">समूह संख्या</label>
              <div className="row">
                <div className="col-lg-4">
                  <div className="form">
                    <label htmlFor="">पुरुष</label>
                    <input
                      className='form-control'
                      placeholder="0"
                      name='samuha_male_no'
                      value={values.samuha_male_no}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form">
                    <label htmlFor="">महिला</label>
                    <input
                      className='form-control'
                      placeholder="0"
                      name='samuha_female_no'
                      value={values.samuha_female_no}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form">
                    <label htmlFor="">अन्य</label>
                    <input
                      className='form-control'
                      placeholder="0"
                      name='samuha_other_no'
                      value={values.samuha_other_no}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <label htmlFor="">कार्यसमिति संख्या</label>
              <div className="row">
                <div className="col-lg-4">
                  <div className="form">
                    <label htmlFor="">पुरुष</label>
                    <input
                      className='form-control'
                      placeholder="0"
                      name='mgmt_male_no'
                      value={values.mgmt_male_no}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form">
                    <label htmlFor="">महिला</label>
                    <input
                      className='form-control'
                      placeholder="0"
                      name='mgmt_female_no'
                      value={values.mgmt_female_no}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form">
                    <label htmlFor="">अन्य</label>
                    <input
                      className='form-control'
                      placeholder="0"
                      name='mgmt_other_no'
                      value={values.mgmt_other_no}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <label htmlFor="">सम्पर्क ठेगाना</label>
              <textarea
                name="address"
                id=""
                className='form-control'
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>
        <div className="button text-right">
          <Button
            className='btn btn-custom mr-2'
            text={"पेश गर्नुहोस्"}
            disabled={props.loading}
            loading={props.loading}
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  loading:
    state.OrganizationData.postOrganizationLogs.isFetching,
  ward: state.wardData.getWardLogs.data
});

const mapDispatchToProps = {
  postOrganizationLogsAction,
  updateOrganizationLogsAction,
  getWardLogsAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(OrganizationForm);
