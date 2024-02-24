import React, { useState } from "react";
import "./TestPoling.css";
import {callApi} from "../utils/Api";


const getCurrentCount = async (id) => {
  const query = `
  query MyQuery {
    vote_count(where: {option_id: {_eq: ${id}}}) {
      current_count
      id
      option_id
    }
  }
  `
  const response  = await callApi(query);
  return response.data.data.vote_count[0].current_count
}



const updateVoteCount = async (id) => {
  const formattedId = `"${id}"`;
  const graphqlQuery = `
query MyQuery {
activity_by_pk(id:  ${formattedId}) {
  heading
  options_activities {
    name

    vote_counts {
      current_count
    }
  }
}
}
  `
  const response  = await callApi(graphqlQuery);

  if (response.data && response.data.data){
    const propObject = {};
    console.log(response.data.data)
    for(let key of response.data.data.activity_by_pk.options_activities ){
      propObject[key.name] = {...key, label : key.name, vote: key.vote_counts[0].current_count, heading : response.data.data.activity_by_pk.heading};
    }
    const initialVotes = {};
    Object.keys(propObject).forEach((option) => {
      initialVotes[option] = propObject[option].vote || 0;
    });
    return initialVotes;
}
}

const TestPoling = (props) => {
  const { optionsObject, showOptions } = props;
  console.log("options Object", optionsObject);

  const [votes, setVotes] = useState(() => {
        const initialVotes = {};
        Object.keys(optionsObject).forEach((option) => {
          initialVotes[option] = optionsObject[option].vote || 0;
        });
        return initialVotes;
      });
      const activity = useState(optionsObject[Object.keys(optionsObject)[0]]["activity_id"]);

  setTimeout(async () => {
    console.log("activity",activity)
    const val = await updateVoteCount(activity[0])
    console.log("val from updateVoteCount ", val)
    setVotes((prevVotes) => ({
      ...prevVotes,
      ...val
    }));
  }, 20000)



  const handleVote = async (option, id, option_id) => {
    // const hasVoted = localStorage.getItem(id);
    
    
    // if (!hasVoted) {
  
      const formattedId = `"${option_id}"`
      const updatedCount = await getCurrentCount(formattedId);
  
      const query = `
      mutation MyMutation {
        update_vote_count(where: {option_id: {_eq: ${formattedId}}}, _set: {current_count:  ${updatedCount + 1}}) {
          returning {
            current_count
            id
            option_id
          }
        }
      }
      `
      const response = await callApi(query);

      const count = response.data.data.update_vote_count.returning[0].current_count
      setVotes((prevVotes) => ({
        ...prevVotes,
        [option]: count
      }));
      localStorage.setItem(id, true);
      // alert(`You have successfully voted for ${option}!`);
      return
     
    // } else {
    //   alert("You have already voted for this poll.");
    //   return
    // }
  };

  const handleClick =async (option, id) => {
    showOptions(false);
  }


  const totalVotes = Object.values(votes).reduce((acc, curr) => acc + curr, 0);

  const calculatePercentage = (voteCount) => {
    return totalVotes === 0 ? 0 : ((voteCount / totalVotes) * 100).toFixed(2);
  };
  const header = optionsObject[Object.keys(optionsObject)[0]].heading

  return (
    <div className="polling-container">
    <h2 style={{ marginTop: "10px", fontSize: "40px" , color: "#282c34"}}>{header}</h2>
      <h2 style={{ marginTop: "10px", fontSize: "30px" , color: "#282c34"}}>Total Votes: {totalVotes}</h2>
      <div className="options-container">
        {Object.keys(optionsObject).map((option) => (
          <div key={option} className="option-item" onClick={() => handleVote(option, optionsObject[option].activity_id, optionsObject[option].id)}>
            <p style={{width: `${calculatePercentage(votes[option])}%`, cursor: "pointer", backgroundColor: optionsObject[option].color, height: '20px', maxWidth: '70%', margin: '5px', padding: '15px', borderRadius: '5px',color: 'white', textAlign: 'center', fontSize: '16px'}}>{optionsObject[option].label}</p>
            <div className="option-details">
              <div className="vote-bar" style={{ width: `${calculatePercentage(votes[option])}%`, backgroundColor: optionsObject[option].color }}></div>
              <span className="vote-count">{votes[option]}</span>
              <span className="vote-percentage">({calculatePercentage(votes[option])}%)</span>
            </div>
            <button style={{backgroundColor : optionsObject[option].color,  width: "200px", height: "40px" ,fontSize: "16px" ,marginLeft: "10px",  color : "white"}} type="primary" onClick={() => handleVote(option, optionsObject[option].activity_id, optionsObject[option].id)}>{option}</button>
          </div>
        ))}
      </div>
      <button className="vote-button" onClick={handleClick}>Back</button>
    </div>
  );
};

export default TestPoling;