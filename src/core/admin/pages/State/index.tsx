import React from 'react';
import Form from './Form';
import List from './List';
import { GeneralCard } from '../../../../components/UI/GeneralCard';


interface Props{
  // toggle?: any
}
const ProvinceLists = (props: Props) => {

  const [editData, setEditData] = React.useState<any>();

  console.log({editData});
  
  return (
    <div className="container py-3">
      <GeneralCard title="नेपालको राज्य">
        <div className='row'>
          <div className='col-lg-12'>
            <Form editData={editData} setEditData={setEditData}/>
          </div>
          <div className='col-lg-12'>
            <List setEditData={setEditData} />
          </div>
        </div>
      </GeneralCard>
    </div>
  )
}

export default ProvinceLists;