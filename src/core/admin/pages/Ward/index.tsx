import React from 'react'
import { GeneralCard } from '../../../../components/UI/GeneralCard';
import Form from "./Form";
import List from "./List";

const WardIndex = () => {

  const [editData, setEditData ] = React.useState<any>()

  return (
    <section className='container py-3'>
      <GeneralCard title={"नेपालको वडा"}>
        <div className="row">
          <div className="col-lg-12">
            <Form editData={editData} setEditData={setEditData}/>
          </div>
          <div className="col-lg-12">
            <List setEditData={setEditData}/>
          </div>
        </div>
      </GeneralCard>
    </section>
  )
}

export default WardIndex;