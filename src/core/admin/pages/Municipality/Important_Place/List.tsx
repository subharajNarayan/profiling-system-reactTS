import React from 'react';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { RootState } from '../../../../../store/root-reducer';
import { DeleteIcon, EditIconDark } from '../../../../../assets/images/xd';
import ConfirmationModal from '../../../../../components/UI/ConfirmationModal';
import useDeleteConfirmation from '../../../../../hooks/useDeleteConfirmation';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';
import axios from 'axios';
import { getPlaceLogsAction } from '../../../../../store/modules/municipality/important-place/getPlaceLogs';
import { deletePlaceLogsAction } from '../../../../../store/modules/municipality/important-place/deletePlaceLogs';

interface Props extends PropsFromRedux {
  setEditData: any;
}

const PlaceList = (props: Props) => {

  const dispatch = useDispatch()

  const { modal, editId, toggleModal, handleDeleteClick, resetDeleteData } = useDeleteConfirmation();

  React.useEffect(() => {
    dispatch(getPlaceLogsAction())
  }, [dispatch])

  const stateDetails = useSelector((state: RootState) => state.placeData.getPlaceLogs.data);


  const [data, setData] = React.useState([]);
  console.log({ data });

  // Not using anywhere but it just to view/Fetch data
  React.useEffect(() => {
    // Fetch data using Axios when the component mounts
    axios.get('http://localhost:8080/api/place') // Replace with API endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  const handleOrganizationAction = async () => {
    const res = await props.deletePlaceLogsAction(editId);

    if (res.status === 200 || res.status === 201) {
      toast.success("औधोगिग डाटा मेटाइयो!")
      resetDeleteData();
      props.getPlaceLogsAction()
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
              <th>वडा न.</th>
              <th>स्थानको प्रकार</th>
              <th>क्षेत्रफल</th>
              <th>पहुच स्थिती</th>
              <th style={{ width: "90px" }}>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {stateDetails &&
              stateDetails.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.placename}</td>
                    <td>{item.ward_id}</td>
                    <td>{item.place_type}</td>
                    <td>{item.place_area}</td>
                    <td>{item.accessby}</td>
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
  getPlaceLogsAction,
  deletePlaceLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(PlaceList);