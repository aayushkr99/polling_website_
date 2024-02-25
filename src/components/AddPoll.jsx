import React, { useState } from 'react';
import './AddPoll.css'; 
import { FaTrash } from 'react-icons/fa';
import Button from './Button';
import {callApi, insertRedis} from '../utils/Api';
import { addActivity, insertOptionByActivityId ,insertVoteByOptionId } from '../utils/Query';

const initialStates = {
  heading : "",
  options : [{ text: '', color: '' }]
}
const AddPoll = ({setShowPoll}) => {
  const [heading, setHeading] = useState(initialStates.heading);
  const [options, setOptions] = useState(initialStates.options);

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index].text = event.target.value;
    setOptions(newOptions);
  };

  const handleColorChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index].color = event.target.value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, { text: '', color: '' }]);
  };

  const handleDeleteOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Heading:", heading);
    console.log("Options:", options);

    const addHeadingQuery = addActivity(heading)
    const response = await callApi(addHeadingQuery);
    const activity_id = response.data.data.insert_activity_one.id
    await insertRedis({heading,activity_id })   // redis insert 
    
    for(let obj of options){
      const insertOptionsByActivityId = insertOptionByActivityId(activity_id, obj.text, obj.color)
      const response = await callApi(insertOptionsByActivityId);
      
      const option_id = response.data.data.insert_options_activity_one.id

      const insertVoteCounts = insertVoteByOptionId(option_id)
      await callApi(insertVoteCounts);
      setHeading(initialStates.heading);
      setOptions(initialStates.options);
    }
    setTimeout(() => {
      alert('Your Poll has been added Successfully !!');
      setShowPoll(false)
     },1500);
  };

  return (
    <>
    <div className='addpoll'>
    <Button onClick={()=> setShowPoll(false)} color='black'>back</Button>
    <h1 className='heading'>Create a Poll</h1>
    </div>
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="heading">Heading (Required):</label>
          <input
            type="text"
            id="heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            required
          />
        </div>
        <div>
          {options.map((option, index) => (
            <div key={index} className="option-container">
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(index, e)}
                placeholder="Option text"
                required
              />
              <select
                value={option.color}
                onChange={(e) => handleColorChange(index, e)}
                required
              >
                <option value="">Select Color</option>
                <option value="#ff0000">red</option>
                <option value="#282c34">dark</option>
                <option value="#008000">green</option>
                <option value="#191970">dim blue</option>
                <option value="#9932CC">orchid</option>
                <option value="#0000ff">blue</option>
                <option value="#36454F">charcoal</option>
                <option value="#000000">black</option>
                <option value="#ffa500">orange</option>
              </select>
              <button type="button" onClick={() => handleDeleteOption(index)}>
                <FaTrash />
              </button>
            </div>
          ))}
          <button type="button"  onClick={handleAddOption}>
            Add Option
          </button>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
};

export default AddPoll;
