import React, { useState } from 'react'
import { Table } from 'reactstrap'
import { DeleteIcon } from '../../../../assets/images/xd';
import axios from 'axios';
import { Alert } from 'reactstrap';
import { toast } from 'react-toastify';

const Checkbox = () => {

  const [initialState, setInitialState] = React.useState<any[]>([]);
  const [ selectedRows, setSelectedRows ] = useState<number[]>([]);

  React.useEffect(() => {
    axios.get('http://localhost:5000/api/register')
      .then((response) => {
        setInitialState(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, [])

  function selectAllRows(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      const allRows = initialState.map((rowData, index) => index);
      setSelectedRows(allRows);
    } else {
      setSelectedRows([]);
    }
  }

  function selectRow(event: React.ChangeEvent<HTMLInputElement>) {
    const rowIndex = Number(event.target.value);
    if (event.target.checked) {
      setSelectedRows([...selectedRows, rowIndex]);
    } else {
      setSelectedRows(selectedRows.filter((index) => index !== rowIndex));
    }
  }

  async function deleteRows(_id: number) {
    const newTableData = initialState.filter((rowData) => !selectedRows.includes(rowData.id));
    try {
      for (const _id of selectedRows) {
        await axios.delete(`http://localhost:5000/api/register/${_id}`);
      }
      setInitialState(newTableData);
      setSelectedRows([]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className='p-4'>
      <div className='checkboxs'>
        <div className="checkboxs-heading">
          <h4>Checkbox</h4>
        </div>
        <div className='list data-table'>
          <div className="table-responsive">
            {/* {selectedRows.length ?
              <div id="dlt-status">
                <Alert className="d-flex justify-content-between align-items-center"
                  style={{ border: "1px solid rgba(158, 160, 160, 0.5)", minHeight: "60px" }}>

                  <p style={{ fontSize: "14px", fontWeight: "400", color: "#000" }}>
                    <strong> {selectedRows.length} </strong>Item Selected</p>
                  <h5 className="des" style={{ color: "#000" }}>Are you sure you want to delete ?</h5>

                  <div role="button" id="dlt-btn">
                    <img src={DeleteIcon} alt="DLT" className="ml-2" style={{ color: "darkred" }}
                      onClick={() => deleteRows(initialState.map((item) => item._id))} />
                  </div>
                </Alert>
              </div>
              : null
            } */}
            <Table>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      name="selectAll"
                      id="selectAll" 
                      onChange={selectAllRows}/>
                  </th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Last Name</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {initialState?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        value={index}
                        type="checkbox"
                        id="checked-data" 
                        checked={selectedRows.includes(index)}
                        onChange={selectRow}/>
                    </td>
                    <td>{item.firstname}</td>
                    <td>{item.middlename}</td>
                    <td>{item.lastname}</td>
                    <td>{item.address}</td>
                    <td>{item.email}</td>
                    <td>{item.message}</td>
                    <td className="action">
                      <div role='button' onClick={() => deleteRows(item._id)}>
                        <img src={DeleteIcon} alt="" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Checkbox