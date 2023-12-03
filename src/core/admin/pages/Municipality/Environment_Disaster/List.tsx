import React from 'react'
import ConfirmationModal from '../../../../../components/UI/ConfirmationModal'
import { DeleteIcon, EditIconDark } from '../../../../../assets/images/xd'
import { Table } from 'reactstrap'
import useDeleteConfirmation from '../../../../../hooks/useDeleteConfirmation'
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../store/root-reducer'
import { getDisasterLogsAction } from '../../../../../store/modules/municipality/environment-disaster/getDisasterLogs'
import axios from 'axios'
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier'
import { deleteDisasterLogsAction } from '../../../../../store/modules/municipality/environment-disaster/deleteDisasterLogs'

interface Props extends PropsFromRedux {
  setEditData: any;
}

const EnvironmentDisasterList = (props: Props) => {

  const { modal, editId, toggleModal, handleDeleteClick, resetDeleteData } = useDeleteConfirmation();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getDisasterLogsAction())
  },[dispatch])

  const disasterDetails = useSelector((state: RootState) => state.disasterData.getDisasterLogs.data);

  const [data, setData] = React.useState([]);
  console.log({ data });

  // Not using anywhere but it just to view/Fetch data
  React.useEffect(() => {
    // Fetch data using Axios when the component mounts
    axios.get('http://localhost:8080/api/disaster') // Replace with API endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleEnvironmentAction = async () => {
    const res = await props.deleteDisasterLogsAction(editId)

    if (res.status === 200 || res.status === 201) {
      if (res.status === 200) {
        toast.success("Data deleted successful!!")
        resetDeleteData();
        props.getDisasterLogsAction();
      } else {
        toast.error("Data doesn't Deleted")
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
              <th>ठाउँको नाम</th>
              <th>प्रकोपको प्रकार</th>
              <th>कारण</th>
              <th>समुदायमा पर्ने असर</th>
              <th>रोकथामको उपाय</th>
              <th style={{ width: "90px" }}>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {disasterDetails &&
              disasterDetails.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.disaster_name}</td>
                    <td>{item.disaster_type}</td>
                    <td>{item.disaster_reason}</td>
                    <td>{item.disaster_effect}</td>
                    <td>{item.disaster_prevention}</td>
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
        handleConfirmClick={() => handleEnvironmentAction()} />
    </section>
  )
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {
  getDisasterLogsAction,
  deleteDisasterLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(EnvironmentDisasterList);