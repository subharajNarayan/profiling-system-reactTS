import React from 'react'
import ConfirmationModal from '../../../../../components/UI/ConfirmationModal'
import { DeleteIcon, EditIconDark } from '../../../../../assets/images/xd'
import { Table } from 'reactstrap'
import useDeleteConfirmation from '../../../../../hooks/useDeleteConfirmation'
import { getIncomeLogsAction } from '../../../../../store/modules/municipality/income-statement/getIncomeLogs'
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../store/root-reducer'
import axios from 'axios';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';
import { deleteIncomeLogsAction } from '../../../../../store/modules/municipality/income-statement/deleteIncomeLogs';

interface Props extends PropsFromRedux{
  setEditData: any;
}

const IncomeList = (props: Props) => {

  const { modal, editId, toggleModal, handleDeleteClick, resetDeleteData } = useDeleteConfirmation();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIncomeLogsAction())
  }, [getIncomeLogsAction]);

  const incomeDetails = useSelector((state: RootState) => state.incomeStatementData.getIncomeLogs.data)

  const [data, setData] = React.useState([]);
  console.log({ data });

  // Not using anywhere but it just to view/Fetch data
  React.useEffect(() => {
    // Fetch data using Axios when the component mounts
    axios.get('http://localhost:8080/api/income-statement') // Replace with API endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleIncomeAction = async() => {
    const res = await props.deleteIncomeLogsAction(editId)

    if (res.status === 200 || res.status === 201) {
      if (res.status === 200) {
        toast.success("Data deleted successful!!")
        resetDeleteData();
        props.getIncomeLogsAction();
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
              <th>आय शीर्षक</th>
              <th>रकम</th>
              <th>कैफियत</th>
              <th style={{ width: "90px" }}>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {incomeDetails &&
              incomeDetails.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.income_title}</td>
                    <td>{item.rate}</td>
                    <td>{item.mood}</td>
                    <td className='action'>
                      <div role='button' className="mr-0">
                        <img src={EditIconDark} alt="edit" onClick={() => {
                          props.setEditData(item)
                        }}/>
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
        handleConfirmClick={() => handleIncomeAction()} />
    </section>
  )
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {
  getIncomeLogsAction,
  deleteIncomeLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(IncomeList);