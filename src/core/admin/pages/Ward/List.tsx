import React from 'react'
import { Table } from 'reactstrap';
import { DeleteIcon, EditIconDark } from '../../../../assets/images/xd';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { getWardLogsAction } from '../../../../store/modules/ward/getWardLogs';
import { RootState } from '../../../../store/root-reducer';
import useDeleteConfirmation from '../../../../hooks/useDeleteConfirmation';
import ConfirmationModal from '../../../../components/UI/ConfirmationModal';
import { deleteWardLogsAction } from '../../../../store/modules/ward/deleteWardLogs';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

interface Props extends PropsFromRedux {
  setEditData: any;
}

const WardList = (props: Props) => {
  
  const { modal, editId, toggleModal, handleDeleteClick, resetDeleteData } = useDeleteConfirmation();
  
  const dispatch = useDispatch()
  
  React.useEffect(() => {
    dispatch(getWardLogsAction());
  }, [dispatch])
  
  const stateDetails = useSelector((state: RootState) => {
    console.log('upading.... state', state.wardData.getWardLogs.data);
    
    return state.wardData.getWardLogs.data;
  })

  console.log(stateDetails, "Ward");

  const DeleteWardAction = async () => {
    const res: AxiosResponse = await props.deleteWardLogsAction(editId)
    console.log(res, "Successfully delete");

    try {
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message)
        resetDeleteData()
        await props.getWardLogsAction();
      } else {
        toast.error("Coundn't Delete Data")
      }
    } catch (error) {
      toast.error("SERVER ERROR")
    }
  }

  if (!stateDetails) {
    return <div>Loading...</div>;
  }

  return (
    <section className='data-table mt-4'>
      <div className='table-responsive'>
        <Table>
          <thead>
            <tr>
              <th style={{ width: "90px" }}>क्र.स.</th>
              <th>वडा नम्बर</th>
              <th style={{ width: "90px" }}>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {
              stateDetails && stateDetails.map((item, index) => {
                const serialNumber = index + 1
                return (
                  <tr key={index}>
                    <td>{serialNumber}</td>
                    <td>{item.ward_number}</td>
                    <td>
                      <div className="action">
                        <div role='button' className='mr-0' onClick={() =>
                          props.setEditData(item)}
                        >
                          <img src={EditIconDark} alt="edit" />
                        </div>
                        <div role='button' className='mr-0' onClick={() => handleDeleteClick(item.ward_id)}>
                          <img src={DeleteIcon} alt="delete" />
                        </div>
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
        handleConfirmClick={() => DeleteWardAction()} />
    </section>
  )
}

const mapStateToProps = (state: RootState) => ({
  // vdcDetails: state.vdcData.getVDCLogs.data
})

const mapDispatchToProps = {
  getWardLogsAction,
  deleteWardLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(WardList);