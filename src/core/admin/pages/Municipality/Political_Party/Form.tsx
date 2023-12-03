import React, { useState } from 'react';
import { ConnectedProps, connect, useDispatch } from 'react-redux';
import { RootState } from '../../../../../store/root-reducer';
import Button from '../../../../../components/UI/Forms/Buttons';
import { getWardLogsAction } from '../../../../../store/modules/ward/getWardLogs';
import { politicalInitialValues, politicalValidationSchema } from './schema';
import { useFormik } from 'formik';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';
import FormikValidationError from '../../../../../components/React/FormikValidationError/FormikValidationError';
import { postPoliticalLogsAction } from '../../../../../store/modules/municipality/political-party/postPoliticsLogs';
import { updatePoliticalLogsAction } from '../../../../../store/modules/municipality/political-party/updatePoliticsLogs';

interface Props extends PropsFromRedux {
  editData: any,
  setEditData: any,
}

const PoliticalForm = (props: Props) => {


  const [initialData, setInitialData] = useState<typeof politicalInitialValues>(
    politicalInitialValues
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
    validationSchema: politicalValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {

      let res;
      setLoader(true);
      if (props.editData) {
        res = await props.updatePoliticalLogsAction(props.editData.id, {
          ...submitValue
        })
      } else {
        res = await props.postPoliticalLogsAction({
          ...submitValue,
        })
      }

      if (res.status === 201 || res.status === 200) {
        if (props.editData) {
          props.setEditData(null)
          setInitialData(politicalInitialValues)
          toast.success("Data updated successful")
          resetForm()
          setLoader(false);
        } else {
          setInitialData(politicalInitialValues)
          toast.success("Data posted successful")
          resetForm()
          setLoader(false)
        }
      } else {
        toast.error("SERVER ERROR")
      }
    }
  });

  return (
    <div className='industry-form'>
      <form action=""
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(e)
        }}
      >
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group px-3">
              <label htmlFor="">राजनैतिक दल<span style={{ color: "red" }}>*</span></label>
              <input
                className='form-control'
                name='politicsname'
                value={values.politicsname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='politicsname' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className='num_of_committee px-3'>
              <div className=" my-3">
                <h5>कार्यसमिति संख्या</h5>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="">पुरुष</label>
                    <input
                      className='form-control'
                      name='comm_male'
                      value={values.comm_male}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormikValidationError name='comm_male' errors={errors} touched={touched} />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="">महिला</label>
                    <input
                      className='form-control'
                      name='comm_female'
                      value={values.comm_female}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormikValidationError name='comm_female' errors={errors} touched={touched} />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="">अन्य</label>
                    <input
                      className='form-control'
                      name='comm_other'
                      value={values.comm_other}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormikValidationError name='comm_other' errors={errors} touched={touched} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className='religions px-3'>
              <div className=" my-3">
                <h5>ब्राह्मण/क्षत्री/ठकुरी</h5>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="">पुरुष</label>
                    <input
                      className='form-control'
                      name='reli_male'
                      value={values.reli_male}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormikValidationError name='reli_male' errors={errors} touched={touched} />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="">महिला</label>
                    <input
                      className='form-control'
                      name='reli_female'
                      value={values.reli_female}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormikValidationError name='reli_female' errors={errors} touched={touched} />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="">अन्य</label>
                    <input
                      className='form-control'
                      name='reli_other'
                      value={values.reli_other}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormikValidationError name='reli_other' errors={errors} touched={touched} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className='dalit px-3'>
              <div className=" my-3">
                <h5>दलित</h5>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="">पुरुष</label>
                    <input
                      className='form-control'
                      name='dalit_male'
                      value={values.dalit_male}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormikValidationError name='dalit_male' errors={errors} touched={touched} />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="">महिला</label>
                    <input
                      className='form-control'
                      name='dalit_female'
                      value={values.dalit_female}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormikValidationError name='dalit_female' errors={errors} touched={touched} />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="">अन्य</label>
                    <input
                      className='form-control'
                      name='dalit_other'
                      value={values.dalit_other}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormikValidationError name='dalit_other' errors={errors} touched={touched} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className='tribes px-3'>
              <div className=" my-3">
                <h5>जनजाती/आदिवासी</h5>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="">पुरुष</label>
                    <input
                      className='form-control'
                      name='tribes_male'
                      value={values.tribes_male}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormikValidationError name='tribes_male' errors={errors} touched={touched} />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="">महिला</label>
                    <input
                      className='form-control'
                      name='tribes_female'
                      value={values.tribes_female}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormikValidationError name='tribes_female' errors={errors} touched={touched} />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="">अन्य</label>
                    <input
                      className='form-control'
                      name='tribes_other'
                      value={values.tribes_other}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormikValidationError name='tribes_other' errors={errors} touched={touched} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className='others px-3'>
              <div className=" my-3">
                <h5>अन्य</h5>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="">पुरुष</label>
                    <input
                      className='form-control'
                      name='other_male'
                      value={values.other_male}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormikValidationError name='other_male' errors={errors} touched={touched} />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="">महिला</label>
                    <input
                      className='form-control'
                      name='other_female'
                      value={values.other_female}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormikValidationError name='other_female' errors={errors} touched={touched} />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="">अन्य</label>
                    <input
                      className='form-control'
                      name='other_other'
                      value={values.other_other}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormikValidationError name='other_other' errors={errors} touched={touched} />
                  </div>
                </div>
              </div>
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
});

const mapDispatchToProps = {
  postPoliticalLogsAction,
  updatePoliticalLogsAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PoliticalForm);
