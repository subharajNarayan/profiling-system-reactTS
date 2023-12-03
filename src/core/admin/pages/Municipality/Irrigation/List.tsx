import React from 'react'
import { Table } from 'reactstrap'
import useDeleteConfirmation from '../../../../../hooks/useDeleteConfirmation';
import { DeleteIcon, EditIconDark } from '../../../../../assets/images/xd';
import ConfirmationModal from '../../../../../components/UI/ConfirmationModal';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/root-reducer';
import axios from 'axios';
import { getIrrigationLogsAction } from '../../../../../store/modules/municipality/irrigation/getIrrigationLogs';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';
import { deleteIrrigationLogsAction } from '../../../../../store/modules/municipality/irrigation/deleteIrrigationLogs';

interface Props extends PropsFromRedux {
  setEditData: any
}

interface IData {
  id: number;
  irri_name: string,
  irri_type: string,
  irri_period: string,
  households_benefited_no: number,
  builtBy: string,
  builtYear: string,
  irri_area: string,
  current_situation: string,
  beneficiary_wards: string,
}

const InfrastructureList = (props: Props) => {

  const { modal, editId, toggleModal, handleDeleteClick, resetDeleteData } = useDeleteConfirmation();

  const stateDetails = useSelector((state: RootState) => state.irrigationData.getIrrigationLogs.data);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIrrigationLogsAction())
  }, [dispatch])

  const [data, setData] = React.useState<IData[]>([]);

  console.log({data});
  

  // Not using anywhere but it just to view data
  React.useEffect(() => {
    // Fetch data using Axios when the component mounts
    axios.get('http://localhost:8080/api/irrigation') // Replace with API endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const handleIrrigationAction = async() => {

    const res = await props.deleteIrrigationLogsAction(editId);

    if (res.status === 200 || res.status === 201) {
      if (res.status === 200) {
        props.getIrrigationLogsAction();
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
              <th>नाम</th>
              <th>अवधि</th>
              <th>सिचाईको प्रकार</th>
              <th>शिक्षित क्षेत्रफल</th>
              <th>लाभान्वित घरसंख्या</th>
              <th>हालको अवस्था</th>
              <th style={{ width: "90px" }}>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {stateDetails &&
              stateDetails.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.irri_name}</td>
                    <td>{item.irri_period}</td>
                    <td>{item.irri_type}</td>
                    <td>{item.irri_area}</td>
                    <td>{item.households_benefited_no}</td>
                    <td>{item.current_situation}</td>
                    <td className='action'>
                      <div role='button' className="mr-0" onClick={() => props.setEditData(item)}>
                        <img src={EditIconDark} alt="edit" />
                      </div>
                      <div role='button' className="mr-0" onClick={() => handleDeleteClick(item.id)}>
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
      handleModal={toggleModal} 
      handleConfirmClick={() => handleIrrigationAction()}      
      />
    </section>
  )
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {
  getIrrigationLogsAction,
  deleteIrrigationLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(InfrastructureList);