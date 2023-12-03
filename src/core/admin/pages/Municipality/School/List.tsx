import React from 'react';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { RootState } from '../../../../../store/root-reducer';
import { DeleteIcon, EditIconDark } from '../../../../../assets/images/xd';
import ConfirmationModal from '../../../../../components/UI/ConfirmationModal';
import useDeleteConfirmation from '../../../../../hooks/useDeleteConfirmation';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';
import { getSchoolLogsAction } from '../../../../../store/modules/municipality/school/getSchoolLogs';
import { deleteSchoolLogsAction } from '../../../../../store/modules/municipality/school/deleteSchoolLogs';
import axios from 'axios';

interface Props extends PropsFromRedux {
  setEditData: any;
}

const SchoolList = (props: Props) => {

  const dispatch = useDispatch()

  const { modal, editId, toggleModal, handleDeleteClick, resetDeleteData } = useDeleteConfirmation();

  React.useEffect(() => {
    dispatch(getSchoolLogsAction())
  }, [dispatch])

  const stateDetails = useSelector((state: RootState) => state.schoolData.getSchoolLogs.data);


  const [data, setData] = React.useState([]);
  console.log({ data });

  // Not using anywhere but it just to view/Fetch data
  React.useEffect(() => {
    // Fetch data using Axios when the component mounts
    axios.get('http://localhost:8080/api/school') // Replace with API endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  const handleOrganizationAction = async () => {
    const res = await props.deleteSchoolLogsAction(editId);

    if (res.status === 200 || res.status === 201) {
      toast.success("विद्यालय डाटा मेटाइयो!")
      resetDeleteData();
      props.getSchoolLogsAction()
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
              <th>स्थापना वर्ष</th>
              <th>विद्यालयको प्रकार</th>
              <th>विद्यालयको तह</th>
              <th style={{ width: "90px" }}>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {stateDetails &&
              stateDetails.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.schoolname}</td>
                    <td>{item.ward_id}</td>
                    <td>{item.est_date}</td>
                    <td>{item.schooltype}</td>
                    <td>{item.schoollvl}</td>
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
  getSchoolLogsAction,
  deleteSchoolLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SchoolList);