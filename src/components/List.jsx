import React, {useEffect, useState} from 'react';
import TestPoling from './TestPoling';
import './List.css';
import {callApi, searchRedis} from '../utils/Api';
import Button from './Button';
import AddPoll from './AddPoll';
import Search from './Search';

const List = () => {
  const [data, setData] = useState([]);
  const [showOptions,  setShowOptions] = useState(false);
  const [showPoll, setShowPoll] = useState(false);
  const [state, setState] = useState({});
  const [searchInput ,setSearchInput ] = useState("");

  const fetchData = async () => {
    const graphqlQuery = `
    query MyQuery {
      activity {
        heading
        id
      }
    }
`;
    const response = await callApi(graphqlQuery);

    setData(response.data.data.activity)
  };

  useEffect(() => {
    fetchData();
  },[]);

  useEffect(() => {
    if (!showOptions) {
      fetchData();
    }
  }, [showOptions]);

  const handleClick = async (id) => {
    try{

    const formattedId = `"${id}"`;
    const graphqlQuery = `
query MyQuery {
  activity_by_pk(id:  ${formattedId}) {
    heading
    id
    options_activities {
      color
      activity_id
      name
      id
      vote_counts {
        current_count
        id
        option_id
      }
    }
  }
}
    `
    const response = await  callApi(graphqlQuery);

    if (response.data && response.data.data){
      setShowOptions(true)
      const propObject = {};
      console.log(response.data.data)
      for(let key of response.data.data.activity_by_pk.options_activities ){
        propObject[key.name] = {...key, label : key.name, vote: key.vote_counts[0].current_count, heading : response.data.data.activity_by_pk.heading};
      }
      setState(propObject)
    }else {
      console.error("Invalid GraphQL response:", response.data);
    }


    console.log(data)
}catch(err){
  console.log(err)
  throw new Error(err.message)
}

  }


  const handlePoll = async() => {
    setShowPoll(true)
  }

  const handleSearchSubmit  = async (e) => {
    e.preventDefault();
    
    // console.log(searchInput)
    if(searchInput === ""){
      fetchData();
    }else{

      const redisdata = await searchRedis(searchInput);
      if(redisdata.status){
      console.log(`data coming from redis -=-=-=-> ${redisdata.data}`, `data already present before search -=-=-=> ${data[0]}` );
  
        const val = redisdata.data.filter(x => typeof(x) == "string");
        const final = val.map (x => {
            const parts = x.split(':');
       const uuid = parts[1];
       return uuid
        })
    
        console.log(final);
        const filteredArr = data.filter(obj => final.includes(obj.id));
        setData(filteredArr)
      }
    }
  }

  return (
    <>
    {showPoll ? (<AddPoll setShowPoll={setShowPoll} />) : (
      <div style={{backgroundColor: "#282c34", minHeight: "100vh"}}>
      {!showOptions ? (
        <div className="list-container">
        <div style={{display: 'flex', flexDirection: "row", justifyContent: "space-around" , "alignItems": "center"}}>
          <h2 style={{color: "white", fontSize: "60px", lineHeight: "60px"}}>List of Activities</h2>
          <Search onChange={(e) =>setSearchInput(e.target.value) } onClick = {handleSearchSubmit} />
          </div>

          <Button onClick={handlePoll}>Add poll</Button>
          {data.map((obj) => {
            return (
              <div className="activity-item" key={obj.id} onClick={() => handleClick(obj.id)}>
                {obj.heading}
              </div>
            );
          })}
        </div>
      ) : (
        <TestPoling optionsObject={state} showOptions={setShowOptions} />
      )}
    </div>
    )}
    </>
  );
}

export default List;

































// (
//   <div style={{backgroundColor: "#282c34", minHeight: "100vh"}}>
//     {!showOptions ? (
//       <div className="list-container">
//         <h2 style={{color: "white", fontSize: "60px", lineHeight: "60px"}}>List of Activities</h2>
//         {data.map((obj) => {
//           return (
//             <div className="activity-item" key={obj.id} onClick={() => handleClick(obj.id)}>
//               {obj.heading}
//             </div>
//           );
//         })}
//       </div>
//     ) : (
//       <TestPoling optionsObject={state} showOptions={setShowOptions} />
//     )}
//   </div>
// );