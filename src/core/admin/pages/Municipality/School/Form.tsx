import React, { useState } from 'react';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/root-reducer';
import Button from '../../../../../components/UI/Forms/Buttons';
import axios from 'axios';
import { getWardLogsAction } from '../../../../../store/modules/ward/getWardLogs';
import { schoolInitialValues, schoolValidationSchema } from './schema';
import { useFormik } from 'formik';
import NepaliDatePicker from '../../../../../components/UI/Calendar';
import { postSchoolLogsAction } from '../../../../../store/modules/municipality/school/postSchoolLogs';
import { updateSchoolLogsAction } from '../../../../../store/modules/municipality/school/updateSchoolLogs';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';
import FormikValidationError from '../../../../../components/React/FormikValidationError/FormikValidationError';

interface Props extends PropsFromRedux {
  editData: any,
  setEditData: any,
}

const SchoolForm = (props: Props) => {


  const [initialData, setInitialData] = useState<typeof schoolInitialValues>(
    schoolInitialValues
  )

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (props.editData) {
      setInitialData({
        ...props.editData
      })
    }
    dispatch(getWardLogsAction())
  }, [props.editData]);

  const [ loader, setLoader ] = React.useState(false);

  const wardDetails = useSelector((state: RootState) => state.wardData.getWardLogs.data);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialData,
    validationSchema: schoolValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {

      let res;
      setLoader(true);
      if (props.editData) {
        res = await props.updateSchoolLogsAction(props.editData.id, {
          id: props.editData.id,
          ...submitValue
        })
      } else {
        res = await props.postSchoolLogsAction({
          ...submitValue,
        })
      }

      if (res.status === 201 || res.status === 200) {
        if (props.editData) {
          props.setEditData(null)
          setInitialData(schoolInitialValues)
          toast.success("Data updated successful")
          resetForm()
          setLoader(false);
        } else {
          setInitialData(schoolInitialValues)
          toast.success("Data posted successful")
          resetForm()
          setLoader(false)
        }
      } else {
        toast.error("SERVER ERROR")
      }
    }
  });


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
    <div className='school-form'>
      <form action=""
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(e)
         }}
      >
        <div className="row">
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">नाम <span style={{ color: "red" }}>*</span></label>
              <input
                className='form-control'
                name='schoolname'
                value={values.schoolname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='schoolname' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">वडा न. <span style={{ color: "red" }}>*</span></label>
              <select
                className='form-control'
                name="ward_id"
                onChange={(e) => {
                  handleChange(e)
                  setFieldValue("ward_id", e.target.value)
                }}
              >
                <option selected>चयन गर्नुहोस्...</option>
                {wardDetails && wardDetails.map((item, index) => {
                  return (
                    <option key={index}>{item.ward_number}</option>
                  )
                })}
              </select>
              <FormikValidationError name='ward_id' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">स्थापना वर्ष <span style={{ color: "red" }}>*</span></label>
              <NepaliDatePicker name={'est_date'}/>
              <FormikValidationError name='est_date' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">विद्यालयको प्रकार <span style={{ color: "red" }}>*</span></label>
              <select
                className='form-control'
                name="schooltype"
                value={values.schooltype}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option selected>चयन गर्नुहोस्...</option>
                <option value="१-सरकारी">१-सरकारी</option>
                <option value="२-निजि">२-निजि</option>
                <option value="३-सामुदायिक">३-सामुदायिक</option>
                <option value="४-अन्य(मदरसा/गुम्बा)">४-अन्य(मदरसा/गुम्बा)</option>
              </select>
              <FormikValidationError name='schooltype' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">विद्यालयको तह <span style={{ color: "red" }}>*</span></label>
              <select
                className='form-control'
                name="schoollvl"
                value={values.schoollvl}
                onChange={handleChange}
                onBlur={handleBlur}
                >
                <option selected>चयन गर्नुहोस्...</option>
                <option value="१-पूर्वप्रावी">१-पूर्वप्रावी</option>
                <option value="२-प्रावी">२-प्रावी</option>
                <option value="३-निवामी">३-निवामी</option>
                <option value="४-वामी">४-वामी</option>
                <option value="५-उवामी">५-उवामी</option>
              </select>
              <FormikValidationError name='schoollvl' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">विद्यालय परित्याग दर</label>
              <input
                className='form-control'
                name='school_leaving_rate'
                value={values.school_leaving_rate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">भर्नादर</label>
              <input
                className='form-control'
                name='admit_rate'
                value={values.admit_rate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>

        {/* (भौतिक पूर्वाधार) PHYSICAL INFRASTRUCTURE START */}
        <div className="physical_infra text-center">
          <h5>भौतिक पूर्वाधार</h5>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">कच्ची भवन संख्या</label>
              <input
                className='form-control'
                name='temp_building_no'
                value={values.temp_building_no}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">कच्ची कोठा संख्या</label>
              <input
                className='form-control'
                name='temp_class_no' 
                value={values.temp_class_no}
                onChange={handleChange}
                onBlur={handleBlur}
                />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">पक्की चक्की संख्या</label>
              <input
                className='form-control'
                name='perm_building_no'
                value={values.perm_building_no}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">पक्की कोठा संख्या</label>
              <input
                className='form-control'
                name='perm_class_no'
                value={values.perm_class_no}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">शौचालयको प्रकार</label>
              <select
                className='form-control'
                name="toilet_type"
                value={values.toilet_type}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option selected>चयन गर्नुहोस्...</option>
                <option value="१-कच्ची">१-कच्ची</option>
                <option value="२-पक्की">२-पक्की</option>
                <option value="३-शौचालय नभएको">३-शौचालय नभएको</option>
              </select>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">शौचालयको संख्या</label>
              <input
                className='form-control'
                name='toilet_no'
                value={values.toilet_no}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">सुरक्षित खानेपानी</label>
              <select
                className='form-control'
                name="drinking_service"
                value={values.drinking_service}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option selected>चयन गर्नुहोस्...</option>
                <option value="छ">छ</option>
                <option value="छैन">छैन</option>
              </select>
            </div>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-lg-4">
            <div className="form-group">
              <label htmlFor="">पुरुष</label>
              <input
                className='form-control'
                name='mgmt_male'
                value={values.mgmt_male}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <label htmlFor="">महिला</label>
              <input
                className='form-control'
                name='mgmt_female'
                value={values.mgmt_female}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <label htmlFor="">अन्य</label>
              <input
                className='form-control'
                name='mgmt_other'
                value={values.mgmt_other}
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
      state.schoolData.postSchoolLogs.isFetching ||
      state.schoolData.updateSchoolLogs.isFetching
});

const mapDispatchToProps = {
  getWardLogsAction,
  postSchoolLogsAction,
  updateSchoolLogsAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SchoolForm);
