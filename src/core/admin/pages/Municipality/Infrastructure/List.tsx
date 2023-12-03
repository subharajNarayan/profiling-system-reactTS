import React from 'react'
import { Table } from 'reactstrap'
import useDeleteConfirmation from '../../../../../hooks/useDeleteConfirmation';
import { DeleteIcon, EditIconDark } from '../../../../../assets/images/xd';
import ConfirmationModal from '../../../../../components/UI/ConfirmationModal';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/root-reducer';
import { getInfrastructureLogsAction } from '../../../../../store/modules/municipality/infrastructure/getInfrastructureLogs';
import { deleteInfrastructureLogsAction } from '../../../../../store/modules/municipality/infrastructure/deleteInfrastructureLogs';
import { toast } from 'react-toastify';
import axios from 'axios';

interface Props extends PropsFromRedux{
  setEditData: any
}

interface IData {
  infra_name: string,
  ward_id: number,
  infra_type: string,
  no_of_benefitted: number,
  road_length: number,
  benefitted_wards: string,
  bridge_type: string,
  road_type: string,
  capacity: string,
}

const InfrastructureList = (props: Props) => {

  const { modal, editId, toggleModal, handleDeleteClick, resetDeleteData } = useDeleteConfirmation();

  const stateDetails = useSelector((state: RootState) => state.infrastructureData.getInfrastructureLogs.data);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getInfrastructureLogsAction())
  },[dispatch])  

  const [ data, setData ] = React.useState<IData[]>([]);
   

  // Not using anywhere but it just to view data
  React.useEffect(() => {
    // Fetch data using Axios when the component mounts
    axios.get('http://localhost:8080/api/infrastructure') // Replace with API endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const handleOrganizationAction = async() => {

    const res = await props.deleteInfrastructureLogsAction(editId);

    if (res.status === 200 || res.status === 201) {
      if (res.status === 200) {
        props.getInfrastructureLogsAction();
        toast.success("Data deleted successful")
        resetDeleteData()
      } else {
        toast.error("Data doesn't deleted.")
        resetDeleteData()
      }
    } else {
      toast.error("SERVER ERROR")
    }
  }

  return (
    <section className='data-table mt-4 list'>
      <div className="table-responsive">
        <Table>
          <thead>
            <tr>
              <th>क्र.स.</th>
              <th>संध संस्था नाम</th>
              <th>वडा न.</th>
              <th>स्थापना वर्ष</th>
              <th>संस्था प्रकार</th>
              <th style={{ width: "90px" }}>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {stateDetails &&
              stateDetails.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.infra_name}</td>
                    <td>{item.ward_id}</td>
                    <td>{item.no_of_benefitted}</td>
                    <td>{item.infra_type}</td>
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
              })}
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
  getInfrastructureLogsAction,
  deleteInfrastructureLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(InfrastructureList);