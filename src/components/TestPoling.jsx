import React, { useState } from "react";
import Button from "./Button";
import axios from 'axios';
import "./TestPoling.css"
const TestPoling = (props) => {
  const { optionsObject, heading, showOptions } = props;
  console.log("options Object", optionsObject)
  const [votes, setVotes] = useState(() => {
        const initialVotes = {};
        Object.keys(optionsObject).forEach((option) => {
          initialVotes[option] = optionsObject[option].vote || 0;
        });
        return initialVotes;
      });

  const handleVote = async (option, id, option_id) => {
    console.log("options =-=-=", option, id, option_id);
    const hasVoted = localStorage.getItem(id);
    
    
    // if (!hasVoted) {
  
      console.log("=====" ,  votes[option] + 1);
      const formattedId = `"${option_id}"`
      const updatedCount=  `"${votes[option] + 1}"`
  
      const query = `
      mutation MyMutation {
        update_vote_count(where: {option_id: {_eq: ${formattedId}}}, _set: {current_count:  ${updatedCount}}) {
          returning {
            current_count
            id
            option_id
          }
        }
      }
      `
      const graphqlEndpoint = "http://20.212.248.87:8080/v1/graphql";
      const response = await axios.post(graphqlEndpoint, {
        query: query,
      });



      const count = response.data.data.update_vote_count.returning[0].current_count
      setVotes((prevVotes) => ({
        ...prevVotes,
        [option]: count
      }));
      localStorage.setItem(id, true);
     
    // } else {
    //   alert("You have already voted for this option.");
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

  console.log("votes-=-=-=", votes)
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
            <button style={{backgroundColor : optionsObject[option].color,  width: "200px", height: "40px" ,fontSize: "16px" ,marginLeft: "10px",  color : "white"}} type="primary" onClick={() => handleVote(option, optionsObject[option].activity_id, optionsObject[option].id)}>Vote</button>
          </div>
        ))}
      </div>
      <button className="vote-button" onClick={handleClick}>Back</button>
    </div>
  );
};

export default TestPoling;

























// (
//   <div style={{backgroundColor: "white", minHeight: "90vh", marginTop: "0px"}}>
//     <h2>{heading}</h2>
//     <h2>Vote Counts: {totalVotes} </h2>
//     <div style={{ width: "1000px" }}>
//       {Object.keys(optionsObject).map((option) => (
//         <div key={option} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//           <p style={{ width: `${calculatePercentage(votes[option])}%`, cursor: "pointer", backgroundColor: optionsObject[option].color, height: '20px', maxWidth: '70%', margin: '5px', padding: '15px', borderRadius: '5px', color: 'white', textAlign: 'center', fontSize: '16px' }} onClick={() => handleVote(option, optionsObject[option].activity_id,  optionsObject[option].id  )}>{optionsObject[option].label}</p>
//           <span style={{ fontSize: '16px', marginRight: '10px' }}>{votes[option]}</span>
//           <span style={{ fontSize: '16px', marginRight: '10px' }}>({calculatePercentage(votes[option])}%)</span>
//           <button style={{ width: '200px', height: '65px', cursor: "pointer", backgroundColor: optionsObject[option].color, color: 'white', border: 'none', borderRadius: '5px', padding: '10px', margin: '5px', fontSize: '16px' }} onClick={() => handleVote(option, optionsObject[option].activity_id,  optionsObject[option].id )}>Vote for {optionsObject[option].label}</button>
//         </div>
//       ))}
//     </div>
//     <Button onClick =  {handleClick}>back</Button>
//   </div>
// );