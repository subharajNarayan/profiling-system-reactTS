import React from 'react';
import { Table } from 'reactstrap';
import { DeleteIcon, EditIconDark } from '../../../../assets/images/xd';
import { getDistrictLogsAction } from '../../../../store/modules/district/getDistrictLog';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/root-reducer';
import useDeleteConfirmation from '../../../../hooks/useDeleteConfirmation';
import { deleteDistrictLogsAction } from '../../../../store/modules/district/deleteDistrictLog';
import ConfirmationModal from '../../../../components/UI/ConfirmationModal';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

interface Props extends PropsFromRedux {
  setEditData : any,
}

function List(props: Props) {

  const dispatch = useDispatch()

  const { editId, modal, toggleModal, handleDeleteClick, resetDeleteData} = useDeleteConfirmation();

  React.useEffect(() => {
    dispatch(getDistrictLogsAction());
  }, [dispatch])

  const stateDetails = useSelector((state: RootState) => state.districtData.getDistrictLogs.data)

  console.log({ ccc: stateDetails });


  const deleteDistrictAction = async() => {
    const response: AxiosResponse = await props.deleteDistrictLogsAction(editId);
    try {
      if (response.status === 200) {
        toast.success(response.data.message);
        props.getDistrictLogsAction()
        resetDeleteData();
      } else {
        toast.error("Couldn't Delete Data")
      }
    } catch (error) {
      toast.error("Internal Server Error");
    }
  }

  return (
    <section className="list data-table mt-4">
      <div className="table-responsive">
        <Table>
          <thead>
            <tr>
              <th style={{ width: "90px" }}>SN</th>
              <th>District Name</th>
              <th style={{ width: "90px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {stateDetails &&
              stateDetails.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.district_name}</td>
                    <td className='action'>
                      <div role='button' className='mr-0' onClick={() => {
                        props.setEditData(item)
                      }}>
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
      <ConfirmationModal open={modal} 
      handleModal= {() => toggleModal()} 
      handleConfirmClick={() => deleteDistrictAction()}
      />
    </section>
  )
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {
  getDistrictLogsAction,
  deleteDistrictLogsAction,
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(List);