import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { useFormik } from 'formik';
import FormikValidationError from '../../../../components/React/FormikValidationError/FormikValidationError';
import { RootState } from '../../../../store/root-reducer';
import Button from '../../../../components/UI/Forms/Buttons';
import { updateDistrictLogsAction } from '../../../../store/modules/district/updateDistrictLog';
import { toast } from 'react-toastify';
import { districtInitialValues, districtValidationSchema } from './schema';
import { postDistrictLogsAction } from '../../../../store/modules/district/postDestrictLog';
import { getDistrictLogsAction } from '../../../../store/modules/district/getDistrictLog';

interface Props extends PropsFromRedux {
  editData: any,
  setEditData: any,
}

const ProvinceForm = (props: Props) => {

  const [initialData, setInitialData] = React.useState<typeof districtInitialValues>(
    districtInitialValues
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
    validationSchema: districtValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {
      let res;

      if (props.editData) {
        res = await props.updateDistrictLogsAction(props.editData.id, {
          ...submitValue,
        });
      } else {
        res = await props.postDistrictLogsAction({
          ...submitValue,
          
        });
      }

      if (res.status === 201 || res.status === 200) {
        if (props.editData) {
          props.setEditData(null);
          setInitialData(districtInitialValues); // Reset initialData to clear the form fields
          toast.success("District Data Updated Successful.");
        } else {
          resetForm();
          toast.success("District Data Posted Successful.");
        }
        props.getDistrictLogsAction();
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
            State Name:
          </label>

          <input
            className="form-control"
            name="district_name"
            value={values.district_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormikValidationError name="district_name" errors={errors} touched={touched} />
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
  );
};

const mapStateToProps = (state: RootState) => ({
  loading:
    state.districtData.postDistrictLogs.isFetching ||
    state.districtData.updateDistrictLogs.isFetching,
});

const mapDispatchToProps = {
  postDistrictLogsAction,
  updateDistrictLogsAction,
  getDistrictLogsAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProvinceForm);
