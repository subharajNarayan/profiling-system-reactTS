import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { useFormik } from 'formik';
import FormikValidationError from '../../../../components/React/FormikValidationError/FormikValidationError';
import { RootState } from '../../../../store/root-reducer';
import Button from '../../../../components/UI/Forms/Buttons';
import { postProvinceLogsAction } from '../../../../store/modules/province/postProvinceLog';
import { updateProvinceLogsAction } from '../../../../store/modules/province/updateProvinceLog';
import { getProvinceLogsAction } from '../../../../store/modules/province/getProvinceLog';
import { toast } from 'react-toastify';
import { provinceInitialValues, provinceValidationSchema } from './schema';

interface Props extends PropsFromRedux {
  editData: any,
  setEditData: any,
}

const ProvinceForm = (props: Props) => {

  const [initialData, setInitialData] = React.useState<typeof provinceInitialValues>(
    provinceInitialValues
  );

  React.useEffect(() => {
    if (props.editData) {
      setInitialData({
        ...props.editData,
      });
    }
  }, [props.editData]);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    // setValues,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialData,
    validationSchema: provinceValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {
      let res;

      if (props.editData) {
        res = await props.updateProvinceLogsAction(props.editData.id, {
          ...submitValue,
        });
      } else {
        res = await props.postProvinceLogsAction({
          ...submitValue,
          
        });
      }

      if (res.status === 201 || res.status === 200) {
        if (props.editData) {
          props.setEditData(null);
          setInitialData(provinceInitialValues); // Reset initialData to clear the form fields
          toast.success("State data updated successfully.");
        } else {
          resetForm();
          toast.success("State data posted successfully.");
        }
        props.getProvinceLogsAction();
      } else {
        toast.error("SERVER ERROR");
      }
      
    }
  });

  return (
    <div className='state-form'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <div className="form-group ">
          <label htmlFor="" className="mr-1">
            राज्यको नाम:
          </label>

          <input
            className="form-control"
            name="state_name"
            value={values.state_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormikValidationError name="state_name" errors={errors} touched={touched} />
        </div>
        <div className='button text-right'>
          <Button
            className="btn custom-btn  mr-2"
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
    state.provinceData.postProvinceLogs.isFetching ||
    state.provinceData.updateProvinceLogs.isFetching,
});

const mapDispatchToProps = {
  postProvinceLogsAction,
  updateProvinceLogsAction,
  getProvinceLogsAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProvinceForm);
