import React from 'react';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { RootState } from '../../../../../store/root-reducer';
import { DeleteIcon, EditIconDark } from '../../../../../assets/images/xd';
import ConfirmationModal from '../../../../../components/UI/ConfirmationModal';
import useDeleteConfirmation from '../../../../../hooks/useDeleteConfirmation';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';
import axios from 'axios';
import { getWaterLogsAction } from '../../../../../store/modules/municipality/water-source/getWaterLogs';
import { deleteWaterLogsAction } from '../../../../../store/modules/municipality/water-source/deleteWaterLogs';

interface Props extends PropsFromRedux {
  setEditData: any;
}

const WaterList = (props: Props) => {

  const dispatch = useDispatch()

  const { modal, editId, toggleModal, handleDeleteClick, resetDeleteData } = useDeleteConfirmation();

  React.useEffect(() => {
    dispatch(getWaterLogsAction())
  }, [dispatch])

  const stateDetails = useSelector((state: RootState) => state.waterData.getWaterLogs.data);


  const [data, setData] = React.useState([]);
  console.log({ data });

  // Not using anywhere but it just to view/Fetch data
  React.useEffect(() => {
    // Fetch data using Axios when the component mounts
    axios.get('http://localhost:8080/api/water') // Replace with API endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  const handleWaterAction = async () => {
    const res = await props.deleteWaterLogsAction(editId);

    if (res.status === 200 || res.status === 201) {
      toast.success("जल स्रोत डाटा मेटाइयो!")
      resetDeleteData();
      props.getWaterLogsAction()
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
              <th>नाम</th>
              <th>समेटेका वडाहरु</th>
              <th>जलस्रोत क्षेत्रको प्रकार</th>
              <th>उपयोग</th>
              <th>परिमाण</th>
              <th style={{ width: "90px" }}>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {stateDetails &&
              stateDetails.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.watername}</td>
                    <td>{item.water_ward}</td>
                    <td>{item.water_res_type}</td>
                    <td>{item.usage_details}</td>
                    <td>{item.area}</td>
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
        handleConfirmClick={() => handleWaterAction()} />
    </section>
  )
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {
  getWaterLogsAction,
  deleteWaterLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(WaterList);