import React from 'react';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { RootState } from '../../../../../store/root-reducer';
import { DeleteIcon, EditIconDark } from '../../../../../assets/images/xd';
import ConfirmationModal from '../../../../../components/UI/ConfirmationModal';
import useDeleteConfirmation from '../../../../../hooks/useDeleteConfirmation';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';
import axios from 'axios';
import { deleteExportLogsAction } from '../../../../../store/modules/municipality/export-source/deleteExportLogs';
import { getExportLogsAction } from '../../../../../store/modules/municipality/export-source/getExportLogs';

interface Props extends PropsFromRedux {
  setEditData: any;
}

const ExportList = (props: Props) => {

  const dispatch = useDispatch()

  const { modal, editId, toggleModal, handleDeleteClick, resetDeleteData } = useDeleteConfirmation();

  React.useEffect(() => {
    dispatch(getExportLogsAction())
  }, [dispatch])

  const stateDetails = useSelector((state: RootState) => state.exportData.getExportLogs.data);


  const [data, setData] = React.useState([]);
  console.log({ data });

  // Not using anywhere but it just to view/Fetch data
  React.useEffect(() => {
    // Fetch data using Axios when the component mounts
    axios.get('http://localhost:8080/api/export') // Replace with API endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  const handleOrganizationAction = async () => {
    const res = await props.deleteExportLogsAction(editId);

    if (res.status === 200 || res.status === 201) {
      toast.success("औधोगिग डाटा मेटाइयो!")
      resetDeleteData();
      props.getExportLogsAction()
    } else {
      toast.error("आन्तरिक सर्भर त्रुटि")
    }
  }


  return (
    <section className='data-table mt-4 list'>
      <div className="table-responsive">
        <Table>
          <thead>
            <tr>
              <th>क्र.स.</th>
              <th>वडा न.</th>
              <th>निकासीजन्य स्रोत</th>
              <th>स्रोतको प्रकार</th>
              <th>वस्तुको नाम</th>
              <th>उत्पादन</th>
              <th>आम्दानी रकम</th>
              <th style={{ width: "90px" }}>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {stateDetails &&
              stateDetails.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.exportward_id}</td>
                    <td>{item.export_res_type}</td>
                    <td>{item.export_material_type}</td>
                    <td>{item.export_material_name}</td>
                    <td>{item.export_qty}</td>
                    <td>{item.export_amnt}</td>
                    <td className='action'>
                      <div role='button' className="mr-0" onClick={() => {
                        props.setEditData(item);
                      }}>
                        <img src={EditIconDark} alt="edit" />
                      </div>
                      <div role='button' className="mr-0" onClick={() => {
                        handleDeleteClick(item.id)
                      }}>
                        <img src={DeleteIcon} alt="delete" />
                      </div>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div>
      <ConfirmationModal open={modal}
        handleModal={() => toggleModal()}
        handleConfirmClick={() => handleOrganizationAction()} />
    </section>
  )
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {
  getExportLogsAction,
  deleteExportLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ExportList);