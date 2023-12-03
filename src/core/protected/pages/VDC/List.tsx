import React from 'react'
import { Table } from 'reactstrap';
import { DeleteIcon, EditIconDark } from '../../../../assets/images/xd';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { getVDCLogsAction } from '../../../../store/modules/vdc/getVDCLogs';
import { RootState } from '../../../../store/root-reducer';
import useDeleteConfirmation from '../../../../hooks/useDeleteConfirmation';
import ConfirmationModal from '../../../../components/UI/ConfirmationModal';
import { deleteVDCLogsAction } from '../../../../store/modules/vdc/deleteVDCLogs';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

interface Props extends PropsFromRedux {
  setEditData: any;
}

const VDCList = (props: Props) => {

  const { modal, editId, toggleModal, handleDeleteClick, resetDeleteData } = useDeleteConfirmation();

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getVDCLogsAction())
  }, [dispatch])

  const stateDetails = useSelector((state: RootState) => state.vdcData.getVDCLogs.data)

  console.log({ stateDetails }); // kun list 

  const DeleteVDCAction = async () => {
    const res: AxiosResponse = await props.deleteVDCLogsAction(editId)
    console.log(res, "Successfully delete");


    try {
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message)
        resetDeleteData()
        props.getVDCLogsAction()

      } else {
        toast.error("Coundn't Delete Data")
      }
    } catch (error) {
      toast.error("SERVER ERROR")
    }
  }

  return (
    <section className='data-table mt-4'>
      <div className='table-responsive'>
        <Table>
          <thead>
            <tr>
              <th style={{ width: "90px" }}>SN</th>
              <th>VDC Name</th>
              <th style={{ width: "90px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {stateDetails &&
              stateDetails.map((item, index) => {
                const serialNumber = index + 1
                return (
                  <tr key={index}>
                    <td>{serialNumber}</td>
                    <td>{item.vdc_name}</td>
                    <td>
                      <div className="action">
                        <div role='button' className='mr-0' onClick={() =>
                          props.setEditData(item)}
                          >
                          <img src={EditIconDark} alt="edit" />
                        </div>
                        <div role='button' className='mr-0' onClick={() => handleDeleteClick(item.id)}>
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
        handleConfirmClick={() => DeleteVDCAction()} />
    </section>
  )
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {
  getVDCLogsAction,
  deleteVDCLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(VDCList);