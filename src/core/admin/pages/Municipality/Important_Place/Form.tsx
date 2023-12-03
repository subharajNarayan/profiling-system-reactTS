import React, { useState } from 'react';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/root-reducer';
import Button from '../../../../../components/UI/Forms/Buttons';
import axios from 'axios';
import { getWardLogsAction } from '../../../../../store/modules/ward/getWardLogs';
import { placeInitialValues, placeValidationSchema } from './schema';
import { useFormik } from 'formik';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';
import FormikValidationError from '../../../../../components/React/FormikValidationError/FormikValidationError';
import { postPlaceLogsAction } from '../../../../../store/modules/municipality/important-place/postPlaceLogs';
import { updatePlaceLogsAction } from '../../../../../store/modules/municipality/important-place/updatePlaceLogs';

interface Props extends PropsFromRedux {
  editData: any,
  setEditData: any,
}

const PlaceForm = (props: Props) => {


  const [initialData, setInitialData] = useState<typeof placeInitialValues>(
    placeInitialValues
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
    validationSchema: placeValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {

      let res;
      setLoader(true);
      if (props.editData) {
        res = await props.updatePlaceLogsAction(props.editData.id, {
          ...submitValue
        })
      } else {
        res = await props.postPlaceLogsAction({
          ...submitValue,
        })
      }

      if (res.status === 201 || res.status === 200) {
        if (props.editData) {
          props.setEditData(null)
          setInitialData(placeInitialValues)
          toast.success("Data updated successful")
          resetForm()
          setLoader(false);
        } else {
          setInitialData(placeInitialValues)
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
    <div className='place-form'>
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
                name='placename'
                value={values.placename}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='placename' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">वडा न. <span style={{ color: "red" }}>*</span></label>
              <select
                className='form-control'
                name="ward_id"
                value={values.ward_id}
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
              <label htmlFor="">स्थानको प्रकार <span style={{ color: "red" }}>*</span></label>
              <select
                className='form-control'
                name="place_type"
                value={values.place_type}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option selected>चयन गर्नुहोस्...</option>
                <option value="१-धार्मिक स्थल">१-धार्मिक स्थल</option>
                <option value="२-एतिहासिक स्थल">२-एतिहासिक स्थल</option>
                <option value="३-पर्यटकिय स्थल">३-पर्यटकिय स्थल</option>
                <option value="४-खेलकुद मैदान">४-खेलकुद मैदान</option>
                <option value="५-पार्क">५-पार्क</option>
                <option value="६-क्रिडास्थल">६-क्रिडास्थल</option>
              </select>
              <FormikValidationError name='place_type' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">क्षेत्रफल (हेक्टर)</label>
              <input
                className='form-control'
                name='place_area'
                value={values.place_area}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='place_area' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">स्वामित्व</label>
              <input
                className='form-control'
                name='ownership'
                value={values.ownership}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">वार्षीय अनुमानित कार्यक्रम संख्या</label>
              <input
                className='form-control'
                name='annual_prgm_no'
                disabled
                value={values.annual_prgm_no}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">पहुच स्थिती </label>
              <select
                className='form-control'
                name="accessby"
                value={values.accessby}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option selected>चयन गर्नुहोस्...</option>
                <option value="१-पैंदल">१-पैंदल</option>
                <option value="२-सडक">२-सडक</option>
                <option value="३-हवाई">३-हवाई</option>
                <option value="४-सबै">४-सबै</option>
              </select>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">होटेल/लज/रेस्टुरेन्ट संख्या</label>
              <input
                className='form-control'
                name='hotelno'
                value={values.hotelno}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='hotelno' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">बजारसम्मको दुरी (मिनेट)</label>
              <input
                className='form-control'
                name='distance'
                value={values.distance}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='distance' errors={errors} touched={touched} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="">आन्तरिक</label>
                  <input
                    className='form-control'
                    name='tourist_internal'
                    value={values.tourist_internal}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormikValidationError name='tourist_internal' errors={errors} touched={touched} />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="">वैदेशिक</label>
                  <input
                    className='form-control'
                    name='tourist_foreign'
                    value={values.tourist_foreign}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormikValidationError name='tourist_foreign' errors={errors} touched={touched} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">हालको राजश्व संकलन (रुपैंयामा)</label>
              <input
                className='form-control'
                name='revenue'
                value={values.revenue}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='revenue' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="button text-right">
              <Button
                className='btn btn-custom mr-2'
                text={"पेश गर्नुहोस्"}
                disabled={loader}
                loading={loader}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  loading:
    state.placeData.postPlaceLogs.isFetching ||
    state.placeData.updatePlaceLogs.isFetching
});

const mapDispatchToProps = {
  getWardLogsAction,
  postPlaceLogsAction,
  updatePlaceLogsAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PlaceForm);
