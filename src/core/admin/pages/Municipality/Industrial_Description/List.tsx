import React from 'react';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { RootState } from '../../../../../store/root-reducer';
import { DeleteIcon, EditIconDark } from '../../../../../assets/images/xd';
import ConfirmationModal from '../../../../../components/UI/ConfirmationModal';
import useDeleteConfirmation from '../../../../../hooks/useDeleteConfirmation';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';
import axios from 'axios';
import { getIndustryLogsAction } from '../../../../../store/modules/municipality/industry-description/getIndustryLogs';
import { deleteIndustryLogsAction } from '../../../../../store/modules/municipality/industry-description/deleteIndustryLogs';

interface Props extends PropsFromRedux {
  setEditData: any;
}

const IndustryList = (props: Props) => {

  const dispatch = useDispatch()

  const { modal, editId, toggleModal, handleDeleteClick, resetDeleteData } = useDeleteConfirmation();

  React.useEffect(() => {
    dispatch(getIndustryLogsAction())
  }, [dispatch])

  const stateDetails = useSelector((state: RootState) => state.industryData.getIndustryLogs.data);


  const [data, setData] = React.useState([]);
  console.log({ data });

  // Not using anywhere but it just to view/Fetch data
  React.useEffect(() => {
    // Fetch data using Axios when the component mounts
    axios.get('http://localhost:8080/api/industry') // Replace with API endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  const handleOrganizationAction = async () => {
    const res = await props.deleteIndustryLogsAction(editId);

    if (res.status === 200 || res.status === 201) {
      toast.success("औधोगिग डाटा मेटाइयो!")
      resetDeleteData();
      props.getIndustryLogsAction()
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
              <th>उद्योगको प्रकार</th>
              <th>उत्पादित सामग्री</th>
              <th>पुरुष रोजगारी</th>
              <th>महिला रोजगारी</th>
              <th style={{ width: "90px" }}>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {stateDetails &&
              stateDetails.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.industryname}</td>
                    <td>{item.industryward_id}</td>
                    <td>{item.industry_type}</td>
                    <td>{item.industry_product}</td>
                    <td>{item.emp_male}</td>
                    <td>{item.emp_female}</td>
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
  getIndustryLogsAction,
  deleteIndustryLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(IndustryList);