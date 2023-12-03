import axios from 'axios';
import React, { useEffect } from 'react';
import { Table } from 'reactstrap';
import { DeleteIcon, EditIconDark } from '../../../../assets/images/xd';
import { toast } from 'react-toastify';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/root-reducer';
import { getUserLogsAction } from '../../../../store/modules/userRegister/getUserRegister';
import useDeleteConfirmation from '../../../../hooks/useDeleteConfirmation';
import ConfirmationModal from '../../../../components/UI/ConfirmationModal';
import { deleteUserRegisterAction } from '../../../../store/modules/userRegister/deleteUserRegister';


interface Props extends PropsFromRedux {
  editData: any
  setEditData: any;
  toggle: any;

}
const List = (props: Props) => {

  const dispatch = useDispatch();
  const [Data, isSetData] = React.useState<any[]>([]);
  const { editId, modal, toggleModal, handleDeleteClick, resetDeleteData } = useDeleteConfirmation();

  useEffect(() => {
    dispatch(getUserLogsAction())
  }, [])

  // const userRegister = useSelector(
  //   (state: RootState) => state.getUserLogs.getUserRegister.data
  // );
  useEffect(() => {
    const userData = props.userInfoLogs
    console.log({ userData });
    isSetData(userData)
  })


  const deleteUserAction = async () => {
    try {
      const response = await props.deleteUserRegisterAction(editId);
      console.log({ response })
      if (response.status === 200) {
        toast.success("Data deleted Successful")
        props.getUserLogsAction();
        resetDeleteData()
      } else {
        toast.error("Couldnot delete data.")
        resetDeleteData()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="list data-table mt-4">
      <div className='table-responsive'>
        <Table>
          <thead>
            <tr>
              <th>FirstName</th>
              <th>MiddleName</th>
              <th>LastName</th>
              <th>Address</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {Data.length > 0 && 
              Data?.map((item: any) => {
              return (
                <tr key={item.id}>
                  <td>{item.firstname}</td>
                  <td>{item.middlename}</td>
                  <td>{item.lastname}</td>
                  <td>{item.address}</td>
                  <td>{item.email}</td>
                  <td>{item.message}</td>
                  <td className='action'>
                    <div role='button' className='mr-0'
                      onClick={() => {
                        props.setEditData(item.id)
                        props.toggle()
                      }
                      }>
                      <img src={EditIconDark} alt="edit" />
                    </div>
                    <div role='button' className='mr-0' onClick={() => handleDeleteClick(item.id)}>
                      <img src={DeleteIcon} alt="delete" />
                    </div>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </Table>
      </div>

      <ConfirmationModal
        open={modal}
        handleModal={() => toggleModal()}
        handleConfirmClick={() => deleteUserAction()}
      />
    </section>
  )
}

const mapStateToProps = (state: RootState) => ({
  userInfoLogs: state.getUserLogs.getUserRegister.data
});

const mapDispatchToProps = {
  getUserLogsAction,
  deleteUserRegisterAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(List);