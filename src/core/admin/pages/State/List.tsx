import React from 'react';
import { Table } from 'reactstrap';
import { DeleteIcon, EditIconDark } from '../../../../assets/images/xd';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { getProvinceLogsAction } from '../../../../store/modules/province/getProvinceLog';
import { deleteProvinceLogsAction } from '../../../../store/modules/province/deleteProvinceLog';
import { RootState } from '../../../../store/root-reducer';
import { toast } from 'react-toastify';
import useDeleteConfirmation from '../../../../hooks/useDeleteConfirmation';
import ConfirmationModal from '../../../../components/UI/ConfirmationModal';

interface Props extends PropsFromRedux {
  setEditData: any
}

const List = (props: Props) => {
  const dispatch = useDispatch();

  const { editId, modal, toggleModal, handleDeleteClick, resetDeleteData } = useDeleteConfirmation();

  React.useEffect(() => {
    dispatch(getProvinceLogsAction());
  }, [dispatch]);

  const stateDetails = useSelector((state: RootState) => state.provinceData.getProvinceLogs.data);
  console.log({stateDetails});


  const deleteProvinceAction = async () => {
    try {
      const response = await props.deleteProvinceLogsAction(editId);
      console.log(response, "response");
      if (response.status === 200) {
        toast.success("Data deleted successfull");
        props.getProvinceLogsAction();
        resetDeleteData();
      } else {
        toast.error("Coundn't delete data");
        resetDeleteData();
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <section className="list data-table mt-4">
      <div className='table-responsive'>
        <Table>
          <thead>
            <tr>
              <th>क्र.स.</th>
              <th>राज्यको नाम</th>
              <th style={{ width: "90px" }}>कार्य</th>
            </tr>
          </thead>
          <tbody>

            {stateDetails && 
              stateDetails.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.state_name}</td>
                    <td className='action'>
                      <div role='button' className='mr-0'
                        onClick={() => {
                          props.setEditData(item)
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
        handleConfirmClick={() => deleteProvinceAction()}
      />
    </section>
  );
};

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {
  getProvinceLogsAction,
  deleteProvinceLogsAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(List);
