import React from 'react'
import { DeleteIcon, EditIconDark } from '../../../../../assets/images/xd';
import { Table } from 'reactstrap';
import ConfirmationModal from '../../../../../components/UI/ConfirmationModal';
import useDeleteConfirmation from '../../../../../hooks/useDeleteConfirmation';
import axios from 'axios';
import { ConnectedProps, connect, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/root-reducer';
import { deleteDrinkingLogsAction } from '../../../../../store/modules/municipality/drinking/deleteDrinkingLogs';
import { getDrinkingLogsAction } from '../../../../../store/modules/municipality/drinking/getDrinkingLogs';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';

interface Props extends PropsFromRedux {
  setEditData: any
}

interface IData {
  id: number;
  name: string,
  ward_id: number,
  beneficiary_wards: string,
  households_benefited_no: number,
  builtBy: string,
  current_situation: string,
  builtYear: string,
}

const DrinkingList = (props: Props) => {

  const { modal, editId, toggleModal, handleDeleteClick, resetDeleteData } = useDeleteConfirmation();

  const [ data, setData ] = React.useState<IData[]>([]);
  
  const stateDetails = useSelector((state: RootState) => state.drinkingData.getDrinkingLogs.data)
  console.log("drinking", stateDetails);
  

  // Not using anywhere but it just to view data
  React.useEffect(() => {
    // Fetch data using Axios when the component mounts
    axios.get('http://localhost:8080/api/drinking') // Replace with API endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleOrganizationAction = async() => {
    const res = await props.deleteDrinkingLogsAction(editId)

    if (res.status === 200 || res.status === 201) {
      if (res.status === 200) {
        // props.getDrinkingLogsAction();
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
              <th>निर्माण वर्ष</th>
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
                  <td>{item.name}</td>
                  <td>{item.ward_id}</td>
                  <td>{item.builtYear}</td>
                  <td>{item.households_benefited_no}</td>
                  <td>{item.current_situation}</td>
                  <td className='action'>
                    <div role='button' className="mr-0" onClick={() => {
                      props.setEditData(item)
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
  deleteDrinkingLogsAction,
  getDrinkingLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(DrinkingList);