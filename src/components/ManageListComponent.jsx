import React, { useState } from "react";
import List from "./List";
import AddPoll from "./AddPoll";
import TestPoling from "./TestPoling";

const ManageListComponent = () => {
  const [data, setData] = useState([]);
  const [showPoll, setShowPoll] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [state, setState] = useState({});

  return (
    <div>
      {!showPoll ? (
        <>
          {!showOptions ? (
            <List
              setData={setData}
              data={data}
              setShowPoll={setShowPoll}
              setState={setState}
              setShowOptions={setShowOptions}
            />
          ) : (
            <TestPoling optionsObject={state} showOptions={setShowOptions} />
          )}
        </>
      ) : (
        <AddPoll setShowPoll={setShowPoll} />
      )}
    </div>
  );
};

export default ManageListComponent;
