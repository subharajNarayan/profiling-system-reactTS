import React from 'react'
import ConfirmationModal from '../../../../../components/UI/ConfirmationModal'
import { DeleteIcon, EditIconDark } from '../../../../../assets/images/xd'
import { Table } from 'reactstrap'
import useDeleteConfirmation from '../../../../../hooks/useDeleteConfirmation'
import { getForestLogsAction } from '../../../../../store/modules/municipality/forest/getForestLogs'
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../store/root-reducer'
import axios from 'axios'
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier'
import { deleteForestLogsAction } from '../../../../../store/modules/municipality/forest/deleteForestLogs'

interface Props extends PropsFromRedux{
  setEditData: any;
}

const ForestList = (props: Props) => {

  const { modal, editId, toggleModal, handleDeleteClick, resetDeleteData } = useDeleteConfirmation();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getForestLogsAction())
  }, [getForestLogsAction]);

  const forestDetails = useSelector((state: RootState) => state.forestData.getForestLogs.data)

  const [data, setData] = React.useState([]);
  console.log({ data });

  // Not using anywhere but it just to view/Fetch data
  React.useEffect(() => {
    // Fetch data using Axios when the component mounts
    axios.get('http://localhost:8080/api/forest') // Replace with API endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleForestAction = async() => {
    const res = await props.deleteForestLogsAction(editId)

    if (res.status === 200 || res.status === 201) {
      if (res.status === 200) {
        toast.success("Data deleted successful!!")
        resetDeleteData();
        props.getForestLogsAction();
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
              <th>नाम</th>
              <th>वडा न.</th>
              <th>वनको किसिम</th>
              <th>वनपैदावर</th>
              <th>क्षेत्रफल</th>
              <th style={{ width: "90px" }}>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {forestDetails &&
              forestDetails.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.forest_name}</td>
                    <td>{item.ward_id}</td>
                    <td>{item.forest_type}</td>
                    <td>{item.forest_res}</td>
                    <td>{item.area}</td>
                    <td className='action'>
                      <div role='button' className="mr-0">
                        <img src={EditIconDark} alt="edit" onClick={() => {
                          props.setEditData(item)
                        }}/>
                      </div>
                      <div role='button' className="mr-0" onClick={() => {
                        handleDeleteClick(item.forest_id)
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
        handleConfirmClick={() => handleForestAction()} />
    </section>
  )
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {
  getForestLogsAction,
  deleteForestLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ForestList);