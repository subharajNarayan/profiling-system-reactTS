import React from 'react'
import { GeneralCard } from '../../../../../components/UI/GeneralCard';
import Form from './Form';
import List from './List';

type Props = {}

const InfrastructureIndex = (props: Props) => {

  const [ editData, setEditData ] = React.useState<any>();

  return (
    <div className='container py-3'>
      <GeneralCard title="भौतिक पूर्वाधार" >
        <div className="row">
          <div className="col-lg-12">
            <Form editData={editData} setEditData={setEditData}/>
          </div>
          <div className="col-lg-12">
            <List setEditData={setEditData}/>
          </div>
        </div>
      </GeneralCard>
    </div>
  )
}

export default InfrastructureIndex;