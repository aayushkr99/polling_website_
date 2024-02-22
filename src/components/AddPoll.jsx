// React Component (AddPoll.js)

import React, { useState } from 'react';
import './AddPoll.css'; // Import the CSS file for styling
import { FaTrash } from 'react-icons/fa'; // Import the trash icon from react-icons/fa
import Button from './Button';
import callApi from '../utils/Api';
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
    // Your submission logic here
    console.log("Heading:", heading);
    console.log("Options:", options);

    const addHeadingQuery = `
    mutation MyMutation {
      insert_activity_one(object: {heading: "${heading}"}) {
        heading
        id
      }
    } 
    `
    const response = await callApi(addHeadingQuery);
    const activity_id = response.data.data.insert_activity_one.id

    for(let obj of options){
      const insertOptionsByActivityId = `
      mutation MyMutation {
        insert_options_activity_one(object: {activity_id: "${activity_id}", name: "${obj.text}", color: "${obj.color}"}) {
          color
          id
          name
        }
      }
      `
      const response = await callApi(insertOptionsByActivityId);

      const option_id = response.data.data.insert_options_activity_one.id

      const insertVoteCounts = `
      mutation MyMutation {
        insert_vote_count_one(object: {current_count: 0, option_id: "${option_id}"}) {
          current_count
          id
          option_id
        }
      }
      `
      await callApi(insertVoteCounts);
      setHeading(initialStates.heading);
      setOptions(initialStates.options);
      setTimeout(() => {
        // alert('Your Poll has been added Successfully !!')
        setShowPoll(false);
       },1500);
    }
  };

  return (
    <>
    <div className='addpoll'>
    <Button onClick={()=> setShowPoll(false)}>back</Button>
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
                {/* <option value="#e0e0e0">White</option> */}
                <option value="#8B0000">red</option>
                <option value="#282c34">dark</option>
                <option value="#556B2F">green</option>
                <option value="#191970">blue</option>
                <option value="#9932CC">orchid</option>
                <option value="#800020">burgundy</option>
                <option value="#36454F">charcoal</option>
                <option value="#8FBC8F">seagreen</option>
                {/* <option value="#2F4F4F">grey</option> */}
                {/* Add more color options as needed */}
              </select>
              <button type="button" onClick={() => handleDeleteOption(index)}>
                <FaTrash /> {/* Render trash icon */}
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddOption}>
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
