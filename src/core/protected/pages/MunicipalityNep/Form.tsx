import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { useFormik } from 'formik';
import FormikValidationError from '../../../../components/React/FormikValidationError/FormikValidationError';
import { RootState } from '../../../../store/root-reducer';
import Button from '../../../../components/UI/Forms/Buttons';
import { toast } from 'react-toastify';
import { municipalityInitialValues, municipalityValidationSchema } from './schema';
import { postMunicipalityLogsAction } from '../../../../store/modules/municipalityNep/postMunicipalityLog';
import { updateMunicipalityLogsAction } from '../../../../store/modules/municipalityNep/updateMunicipalityLog';

interface Props extends PropsFromRedux {
  editData: any,
  setEditData: any,
}

const ProvinceForm = (props: Props) => {

  const [initialData, setInitialData] = React.useState<typeof municipalityInitialValues>(
    municipalityInitialValues
  );

  React.useEffect(() => {
    if (props.editData) {
      setInitialData({
        ...props.editData
      })
    }
  }, [props.editData])

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialData,
    validationSchema: municipalityValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {
      let res;

      if (props.editData) {
        res = await props.updateMunicipalityLogsAction(props.editData.id, {
          ...submitValue
        })
      } else {
        res = await props.postMunicipalityLogsAction({
          ...submitValue,
        })
      }

      if (res.status === 201 || res.status === 200) {
        if (props.editData) {
          props.setEditData(null)
          setInitialData(municipalityInitialValues)
          toast.success("Data Updated Successful")
          resetForm()
        } else {
          setInitialData(municipalityInitialValues)
          toast.success("Data Posted Successful")
          resetForm()
        }
      } else {
        toast.error("SERVER ERROR")
      }
    }
  });

  return (
    <div className='municipality-form'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group ">
              <label htmlFor="" className="mr-1">
                Municipality Name:
              </label>

              <input
                className="form-control"
                name="munici_name"
                value={values.munici_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name="munici_name" errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-6">

            <div className="form-group ">
              <label htmlFor="" className="mr-1">
                Municipality Type:
              </label>

              <input
                className="form-control"
                name="munici_type"
                value={values.munici_type}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name="munici_type" errors={errors} touched={touched} />
            </div>
          </div>
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
    state.municipalityData.postMunicipalityLogs.isFetching
});

const mapDispatchToProps = {
  postMunicipalityLogsAction,
  updateMunicipalityLogsAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProvinceForm);
