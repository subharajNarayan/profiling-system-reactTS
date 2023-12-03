import React from 'react'
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { getMunicipalityLogsAction } from '../../../../store/modules/municipalityNep/getMunicipalityLog';
import { RootState } from '../../../../store/root-reducer';
import { DeleteIcon, EditIconDark } from '../../../../assets/images/xd';
import ConfirmationModal from '../../../../components/UI/ConfirmationModal';
import useDeleteConfirmation from '../../../../hooks/useDeleteConfirmation';
import { toast } from 'react-toastify';
import { deleteMunicipalityLogsAction } from '../../../../store/modules/municipalityNep/deleteMunicipalityLog';
import { AxiosResponse } from 'axios';

interface Props extends PropsFromRedux {
  setEditData: any,
}

const List = (props: Props) => {

  const dispatch = useDispatch();

  const { modal, editId, toggleModal, handleDeleteClick, resetDeleteData }= useDeleteConfirmation();

  React.useEffect(() => {
    dispatch(getMunicipalityLogsAction())
  },[dispatch]);

  const stateDetails = useSelector((state: RootState) => state.municipalityData.getMunicipalityLogs.data)


  const deleteDistrictAction = async() => {
    const res:AxiosResponse = await props.deleteMunicipalityLogsAction(editId)
    
    try {
      if (res.status === 200 || res.status ===201) {
        toast.success(res.data.message)
        resetDeleteData()
        props.getMunicipalityLogsAction()
      } else {
        toast.error("Coundn't Delete Data")
      }
    } catch (error) {
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
              <th>नगरपालिकाको नाम</th>
              <th>नगरपालिका प्रकार</th>
              <th style={{ width: "90px" }}>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {stateDetails &&
              stateDetails.map((item, index) => {
                const serialNumber = index + 1
                return (
                  <tr key={index}>
                    <td>{serialNumber}</td>
                    <td>{item.munici_name}</td>
                    <td>{item.munici_type}</td>
                    <td className='action'>
                      <div role='button' className="mr-0" onClick={() => {
                        props.setEditData(item)
                      }}>
                        <img src={EditIconDark} alt="edit" />
                      </div>
                      <div role='button' className="mr-0" onClick={() => handleDeleteClick(item.id)}>
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
      handleConfirmClick={() => deleteDistrictAction() }       
      />
    </section>
  )
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {
  getMunicipalityLogsAction,
  deleteMunicipalityLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(List);