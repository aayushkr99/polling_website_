import React, { useState } from 'react';
import List from './List';
import AddPoll from './AddPoll';

const ManageListComponent = () => {
    const [data, setData  ] =  useState([]);
    const [showPoll, setShowPoll] = useState(false);
    
  return (
    <div>
        {!showPoll ? <>
        <List setData={setData} data={data} setShowPoll={setShowPoll} /> </>: (<AddPoll setShowPoll={setShowPoll} />)}
            
        
      
    </div>
  );
}

export default ManageListComponent;
