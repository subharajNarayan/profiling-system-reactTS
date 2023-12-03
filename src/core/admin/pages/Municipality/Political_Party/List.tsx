import React from 'react';
import { ConnectedProps, connect, useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { RootState } from '../../../../../store/root-reducer';
import { DeleteIcon, EditIconDark } from '../../../../../assets/images/xd';
import ConfirmationModal from '../../../../../components/UI/ConfirmationModal';
import useDeleteConfirmation from '../../../../../hooks/useDeleteConfirmation';
import toast from '../../../../../components/React/ToastNotifier/ToastNotifier';
import axios from 'axios';
import { getPoliticalLogsAction } from '../../../../../store/modules/municipality/political-party/getPoliticsLogs';
import { deletePoliticalLogsAction } from '../../../../../store/modules/municipality/political-party/deletePoliticsLogs';

interface Props extends PropsFromRedux {
  setEditData: any;
}

const PoliticalList = (props: Props) => {

  const dispatch = useDispatch()

  const { modal, editId, toggleModal, handleDeleteClick, resetDeleteData } = useDeleteConfirmation();

  React.useEffect(() => {
    dispatch(getPoliticalLogsAction())
  }, [dispatch])

  const stateDetails = useSelector((state: RootState) => state.politicalData.getPoliticsLogs.data);


  const [data, setData] = React.useState([]);
  console.log({ data });

  // Not using anywhere but it just to view/Fetch data
  React.useEffect(() => {
    // Fetch data using Axios when the component mounts
    axios.get('http://localhost:8080/api/politics') // Replace with API endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  const handlePoliticalAction = async () => {
    const res = await props.deletePoliticalLogsAction(editId);

    if (res.status === 200 || res.status === 201) {
      toast.success("राजनैतिक दल डाटा मेटाइयो!")
      resetDeleteData();
      props.getPoliticalLogsAction()
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
              <th>दल</th>
              <th>ब्राह्मण/क्षत्री/ठकुरी</th>
              <th>दलित</th>
              <th>जनजाती/आदिवासी</th>
              <th>अन्य</th>
              <th style={{ width: "90px" }}>कार्य</th>
            </tr>
          </thead>
          <tbody>
            {stateDetails &&
              stateDetails.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.politicsname}</td>
                    <td>{item.reli_male + item.reli_female + item.reli_other}</td>
                    <td>{item.dalit_male + item.dalit_female + item.dalit_other}</td>
                    <td>{item.tribes_male + item.tribes_female + item.tribes_other}</td>
                    <td>{item.other_male + item.other_female + item.other_other}</td>
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
        handleConfirmClick={() => handlePoliticalAction()} />
    </section>
  )
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {
  getPoliticalLogsAction,
  deletePoliticalLogsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(PoliticalList);