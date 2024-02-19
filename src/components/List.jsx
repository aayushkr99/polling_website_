import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TestPoling from './TestPoling';
import './List.css';
const List = () => {
  const [data, setData] = useState([]);
  const [showOptions,  setShowOptions] = useState(false);
  const [state, setState] = useState({});

  const fetchData = async () => {
    const graphqlQuery = `
    query MyQuery {
      activity {
        heading
        id
      }
    }
`;
    const graphqlEndpoint = "http://20.212.248.87:8080/v1/graphql";
    const response = await axios.post(graphqlEndpoint, {
      query: graphqlQuery,
    });

    setData(response.data.data.activity)
  };

  useEffect(() => {
    fetchData();
  },[]);

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
    const graphqlEndpoint = "http://20.212.248.87:8080/v1/graphql";
    const response = await axios.post(graphqlEndpoint, {
      query: graphqlQuery,
    });

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


  return (
    <div style={{backgroundColor: "#282c34", minHeight: "100vh"}}>
      {!showOptions ? (
        <div className="list-container">
          <h2 style={{color: "white", fontSize: "60px", lineHeight: "60px"}}>List of Activities</h2>
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