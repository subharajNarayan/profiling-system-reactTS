import React from 'react';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { getOrganizationLogsAction } from '../../../../../store/modules/municipality/organization/getOrganizationLogs';
import { RootState } from '../../../../../store/root-reducer';
import { DeleteIcon, EditIconDark } from '../../../../../assets/images/xd';
import ConfirmationModal from '../../../../../components/UI/ConfirmationModal';
import useDeleteConfirmation from '../../../../../hooks/useDeleteConfirmation';
import { deleteOrganizationLogsAction } from '../../../../../store/modules/municipality/organization/deleteOrganizationLogs';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';

interface Props extends PropsFromRedux {
  setEditData: any;
}

const OrganizationList = (props: Props) => {

  const dispatch = useDispatch()

  const { modal, editId, toggleModal, handleDeleteClick, resetDeleteData } = useDeleteConfirmation();

  React.useEffect(() => {
    dispatch(getOrganizationLogsAction())
  }, [dispatch])

  const stateDetails = useSelector((state: RootState) => state.OrganizationData.getOrganizationLogs.data);

  const handleOrganizationAction = async () => {
    const res = await props.deleteOrganizationLogsAction(editId);

    if (res.status === 200 || res.status === 201) {
      toast.success("संगठन डाटा मेटाइयो!")
      resetDeleteData();
      props.getOrganizationLogsAction()
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
              <th>संध संस्था नाम</th>
              <th>वडा न.</th>
              <th>स्थापना वर्ष</th>
              <th>संस्था प्रकार</th>
              <th style={{ width: "90px" }}>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {stateDetails &&
              stateDetails.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.org_name}</td>
                    <td>{item.ward_id}</td>
                    <td>{item.est_year}</td>
                    <td>{item.org_type}</td>
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
              })}
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
  getOrganizationLogsAction,
  deleteOrganizationLogsAction,
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(OrganizationList);