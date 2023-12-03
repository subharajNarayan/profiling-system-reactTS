import React, { useState } from 'react';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/root-reducer';
import Button from '../../../../../components/UI/Forms/Buttons';
import axios from 'axios';
import { getWardLogsAction } from '../../../../../store/modules/ward/getWardLogs';
import { exportInitialValues, exportValidationSchema } from './schema';
import { useFormik } from 'formik';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';
import FormikValidationError from '../../../../../components/React/FormikValidationError/FormikValidationError';
import { postExportLogsAction } from '../../../../../store/modules/municipality/export-source/postExportLogs';
import { updateExportLogsAction } from '../../../../../store/modules/municipality/export-source/updateExportLogs';

interface Props extends PropsFromRedux {
  editData: any,
  setEditData: any,
}

const ExportForm = (props: Props) => {

  const [initialData, setInitialData] = useState<typeof exportInitialValues>(
    exportInitialValues
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
    validationSchema: exportValidationSchema,
    onSubmit: async (submitValue, { resetForm }) => {

      let res;
      setLoader(true);
      if (props.editData) {
        res = await props.updateExportLogsAction(props.editData.id, {
          ...submitValue
        })
      } else {
        res = await props.postExportLogsAction({
          ...submitValue,
        })
      }

      if (res.status === 201 || res.status === 200) {
        if (props.editData) {
          props.setEditData(null)
          setInitialData(exportInitialValues)
          toast.success("Data updated successful")
          resetForm()
          setLoader(false);
        } else {
          setInitialData(exportInitialValues)
          toast.success("Data posted successful")
          resetForm()
          setLoader(false)
        }
      } else {
        toast.error("SERVER ERROR")
      }
    }
  });


  const [wardData, setWardData] = React.useState([]);
  const [resourcesData, setResourcesData] = React.useState<any[]>([]);
  const [materialData, setMaterialData] = React.useState<any[]>([]);

  console.log({wardData});

  // Not using anywhere but it just to view/Fetch data
  React.useEffect(() => {
    // Fetch data using Axios when the component mounts
    axios.get('http://localhost:8080/api/ward') // Ward API
      .then((response) => {
        setWardData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, []);

  React.useEffect(() => {
    axios.get('http://localhost:8080/api/export-resources') // Export Sources API
      .then((response) => {
        setResourcesData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])

  React.useEffect(() => {
    axios.get('http://localhost:8080/api/export-material-type') // Export Sources API
      .then((response) => {
        setMaterialData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])

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
              <label htmlFor="">वडा न. <span style={{ color: "red" }}>*</span></label>
              <select
                className='form-control'
                name="exportward_id"
                value={values.exportward_id}
                onChange={(e) => {
                  handleChange(e)
                  setFieldValue("exportward_id", e.target.value)
                }}
              >
                <option selected>चयन गर्नुहोस्...</option>
                {wardDetails && wardDetails.map((item, index) => {
                  return (
                    <option key={index}>{item.ward_number}</option>
                  )
                })}
              </select>
              <FormikValidationError name='exportward_id' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">निकासीजन्य स्रोत<span style={{ color: "red" }}>*</span></label>
              <select
                className='form-control'
                name="export_res_type"
                value={values.export_res_type}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option selected>चयन गर्नुहोस्...</option>
                {resourcesData &&
                  resourcesData.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.export_resources}
                      </option>
                    );
                  })}
              </select>

            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">स्रोतको प्रकार <span style={{ color: "red" }}>*</span></label>
              <select
                className='form-control'
                name="export_material_type"
                value={values.export_material_type}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option selected>चयन गर्नुहोस्...</option>
                {materialData && materialData.filter((item) => {
                  console.log({item});
                  if (item.material_ie != values.export_res_type) {
                    return false;
                  }
                  return true;
                }).map((item, index) => {
                  return (
                    <option key={index} value={item.id}>{item.material_type}</option>
                  )
                })}
              </select>

            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">वस्तुको नाम</label>
              <input
                className='form-control'
                name='export_material_name'
                value={values.export_material_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">निकासी(मे.टन)</label>
              <input
                className='form-control'
                name='export_qty'
                value={values.export_qty}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='export_qty' errors={errors} touched={touched} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">आम्दानी(रुपैंयामा)</label>
              <input
                className='form-control'
                name='export_amnt'
                value={values.export_amnt}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormikValidationError name='export_amnt' errors={errors} touched={touched} />
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
    state.exportData.getExportLogs.isFetching ||
    state.exportData.updateExportLogs.isFetching
});

const mapDispatchToProps = {
  getWardLogsAction,
  postExportLogsAction,
  updateExportLogsAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ExportForm);
