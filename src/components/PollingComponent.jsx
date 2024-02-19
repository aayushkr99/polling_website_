import React, { useState } from "react";

const PollingComponent = () => {
  const [votes, setVotes] = useState({ 
    nationalParty: 0, 
    peopleParty: 0, 
    domesticParty: 0, 
    others: 0 
  });

  const totalVotes = Object.values(votes).reduce((acc, curr) => acc + curr, 0);

  const handleVote = (option) => {
    setVotes(prevVotes => ({ ...prevVotes, [option]: prevVotes[option] + 1 }));
  };

  const calculatePercentage = (voteCount) => {
    return totalVotes === 0 ? 0 : ((voteCount / totalVotes) * 100).toFixed(2);
  };

  return (
    <div >
    <h2>Vote for your Favorite the Party:</h2>
    <h2>Vote Counts: {totalVotes} </h2>
    <div style={{ width: "1000px" }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ width: `${calculatePercentage(votes.nationalParty)}%`,cursor:"pointer", backgroundColor: 'blue', height: '20px', maxWidth: '70%', margin: '5px', padding: '15px', borderRadius: '5px', color: 'white', textAlign: 'center', fontSize: '16px' }} onClick={() => handleVote('nationalParty')}>National Party</p>
        <span style={{ fontSize: '16px', marginRight: '10px' }}>{votes.nationalParty}</span>
        <span style={{ fontSize: '16px', marginRight: '10px' }}>({calculatePercentage(votes.nationalParty)}%)</span>
        <button style={{width: '200px', height: '65px',cursor:"pointer", backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', padding: '10px', margin: '5px', fontSize: '16px' }} onClick={() => handleVote('nationalParty')}>Vote for National Party</button>
      </div>
  
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{cursor:"pointer", width: `${calculatePercentage(votes.peopleParty)}%`, backgroundColor: 'green', height: '20px', maxWidth: '70%', margin: '5px', padding: '15px', borderRadius: '5px', color: 'white', textAlign: 'center', fontSize: '16px' }} onClick={() => handleVote('peopleParty')}>People Party</p>
        <span style={{ fontSize: '16px', marginRight: '10px' }}>{votes.peopleParty}</span>
        <span style={{ fontSize: '16px', marginRight: '10px' }}>({calculatePercentage(votes.peopleParty)}%)</span>
        <button style={{cursor:"pointer",width: '200px', height: '65px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', padding: '10px', margin: '5px', fontSize: '16px' }} onClick={() => handleVote('peopleParty')}>Vote for People Party</button>
      </div>
  
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{cursor:"pointer", width: `${calculatePercentage(votes.domesticParty)}%`, backgroundColor: 'red', height: '20px', maxWidth: '70%', margin: '5px', padding: '15px', borderRadius: '5px', color: 'white', textAlign: 'center', fontSize: '16px' }} onClick={() => handleVote('domesticParty')}>Domestic Party</p>
        <span style={{ fontSize: '16px', marginRight: '10px' }}>{votes.domesticParty}</span>
        <span style={{ fontSize: '16px', marginRight: '10px' }}>({calculatePercentage(votes.domesticParty)}%)</span>
        <button style={{cursor:"pointer",width: '200px', height: '65px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', padding: '10px', margin: '5px', fontSize: '16px' }} onClick={() => handleVote('domesticParty')}>Vote for Domestic Party</button>
      </div>
  
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ cursor:"pointer",width: `${calculatePercentage(votes.others)}%`, backgroundColor: 'orange', height: '20px', maxWidth: '70%', margin: '5px', padding: '15px', borderRadius: '5px', color: 'white', textAlign: 'center', fontSize: '16px' }} onClick={() => handleVote('others')}>Others</p>
        <span style={{ fontSize: '16px', marginRight: '10px' }}>{votes.others}</span>
        <span style={{ fontSize: '16px', marginRight: '10px' }}>({calculatePercentage(votes.others)}%)</span>
        <button style={{cursor:"pointer",width: '200px', height: '65px', backgroundColor: 'orange', color: 'white', border: 'none', borderRadius: '5px', padding: '10px', margin: '5px', fontSize: '16px' }} onClick={() => handleVote('others')}>Vote for Others</button>
      </div>
    </div>
  </div>
  
  );
};

export default PollingComponent;
