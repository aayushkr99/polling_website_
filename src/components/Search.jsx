import React from 'react';
import Button from './Button';

const Search = ({onChange, onClick}) => {
  return (
    <div style={{display: 'flex', flexDirection: "row" , alignItems: "center"}}>
        <input style= {{ flex: "1",
    padding: "10px",
    fontSize: "20px",
    marginRight: "8px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#e0e0e0",
    color: "#282c34",
    height: "40px"}} onChange={onChange} type='text' placeholder='search activity'></input>
        <Button onClick={onClick} >search</Button>

    </div>
  );
}

export default Search;
