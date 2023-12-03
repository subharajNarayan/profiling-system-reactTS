import React, { useState } from 'react';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/root-reducer';
import Button from '../../../../../components/UI/Forms/Buttons';
import axios from 'axios';
import { getWardLogsAction } from '../../../../../store/modules/ward/getWardLogs';
import { industryInitialValues, industryValidationSchema } from './schema';
import { useFormik } from 'formik';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';
import FormikValidationError from '../../../../../components/React/FormikValidationError/FormikValidationError';
import { postIndustryLogsAction } from '../../../../../store/modules/municipality/industry-description/postIndustryLogs';
import { updateIndustryLogsAction } from '../../../../../store/modules/municipality/industry-description/updateIndustryLogs';

interface Props extends PropsFromRedux {
  editData: any,
  setEditData: any,
}

const IndustryForm = (props: Props) => {


  const [initialData, setInitialData] = useState<typeof industryInitialValues>(
    industryInitialValues
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

  const [loader, setLoader] = React.useState(false);

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
    validationSchema: industryValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {

      let res;
      setLoader(true);
      if (props.editData) {
        res = await props.updateIndustryLogsAction(props.editData.id, {
          id: props.editData.id,
          ...submitValue
        })
      } else {
        res = await props.postIndustryLogsAction({
          ...submitValue,
        })
      }

      if (res.status === 201 || res.status === 200) {
        if (props.editData) {
          props.setEditData(null)
          setInitialData(industryInitialValues)
          toast.success("Data updated successful")
          resetForm()
          setLoader(false);
        } else {
          setInitialData(industryInitialValues)
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
    <div className='industry-form'>
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
                name='industryname'
                value={values.industryname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='industryname' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">वडा न. <span style={{ color: "red" }}>*</span></label>
              <select
                className='form-control'
                name="industryward_id"
                value={values.industryward_id}
                onChange={(e) => {
                  handleChange(e)
                  setFieldValue("industryward_id", e.target.value)
                }}
              >
                <option selected>चयन गर्नुहोस्...</option>
                {wardDetails && wardDetails.map((item, index) => {
                  return (
                    <option key={index}>{item.ward_number}</option>
                  )
                })}
              </select>
              <FormikValidationError name='industryward_id' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">उद्योगको प्रकार <span style={{ color: "red" }}>*</span></label>
              <select
                className='form-control'
                name="industry_type"
                value={values.industry_type}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option selected>चयन गर्नुहोस्...</option>
                <option value="१-घरेलु तथा साना">१-घरेलु तथा साना</option>
                <option value="२-मझौला">२-मझौला</option>
                <option value="३-ठुलो">३-ठुलो</option>
              </select>
              <FormikValidationError name='industry_type' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">हालको अवस्था <span style={{ color: "red" }}>*</span></label>
              <select
                className='form-control'
                name="industry_currentstatus"
                value={values.industry_currentstatus}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option selected>चयन गर्नुहोस्...</option>
                <option value="१-चालु">१-चालु</option>
                <option value="२-बिग्रेको">२-बिग्रेको</option>
              </select>
              <FormikValidationError name='industry_currentstatus' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">उत्पादन हुने सामग्रीको नाम</label>
              <input
                className='form-control'
                name='industry_product'
                value={values.industry_product}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">उत्पादित सामग्रीको लगभग बार्षिक आम्दानी</label>
              <input
                className='form-control'
                name='industry_income'
                value={values.industry_income}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='industry_income' errors={errors} touched={touched} />
            </div>
          </div>
        </div>

        <div className="gender my-3">
          <h5>प्रत्यक्ष रोजगारी प्राप्त संख्या</h5>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="form-group">
              <label htmlFor="">पुरुष</label>
              <input
                className='form-control'
                name='emp_male'
                value={values.emp_male}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='emp_male' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <label htmlFor="">महिला</label>
              <input
                className='form-control'
                name='emp_female'
                value={values.emp_female}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='emp_female' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <label htmlFor="">अन्य</label>
              <input
                className='form-control'
                name='emp_other'
                value={values.emp_other}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='emp_other' errors={errors} touched={touched} />
            </div>
          </div>
        </div>

        <div className="button text-right">
          <Button
            className='btn btn-custom mr-2'
            text={"पेश गर्नुहोस्"}
            disabled={loader}
            loading={loader}
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  loading:
    state.industryData.postIndustryLogs.isFetching ||
    state.industryData.postIndustryLogs.isFetching
});

const mapDispatchToProps = {
  getWardLogsAction,
  postIndustryLogsAction,
  updateIndustryLogsAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(IndustryForm);
