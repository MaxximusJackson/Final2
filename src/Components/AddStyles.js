import React, {useState} from 'react';
import {nanoid} from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './AddStyle.css';

function AddStyles(props){
  // id, name, description, time_period, image
  const[name,setName] = useState("");
  const[description,setDescription] = useState("");
  const[time_period,setTime_period] = useState("");
  const[selectedFile,setSelectedFile] = useState();
  const[rank,setRank] = useState("");



  const doStyle = () =>{
    const newStyles = {"id":nanoid(), "name":name, "description":description, "time_period": parseInt(time_period), "image":URL.createObjectURL(selectedFile), "rank":rank};
  props.addStyles(newStyles);
  }

  const imageUpdate = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  return(
    <div className='row mt-4' id='addStyle'>
      <h3>Add Style</h3>
      <div className='col'>
        <label htmlFor='txtName' className='form-label'>Name</label>
        <input type="text" id='txtName' placeholder='Name' className='form-control' onChange={(evt) => setName(evt.currentTarget.value)} value={name} />
      </div>
      <div className='col'>
      <label htmlFor='txtDescription' className='form-label'>Description</label>
        <input type="text" id='txtDescription' placeholder='Description' className='form-control' onChange={(evt) => setDescription(evt.currentTarget.value)} value={description} />
      </div>
      <div className='col'>
      <label htmlFor='txtTime_period' className='form-label'>Time Period</label>
        <input type="text" id='txtTime_period' placeholder='Time Period' className='form-control' onChange={(evt) => setTime_period(evt.currentTarget.value)} value={time_period} />
      </div>
      <div className='col'>
      <label htmlFor='txtRank' className='form-label'>Rank</label>
        <input type="text" id='txtRank' placeholder='Rank' className='form-control' onChange={(evt) => setRank(evt.currentTarget.value)} value={rank} />
      </div>
      <div className='col-md-3'>
        <label htmlFor='fileUpload' className='form-label'>Style Image</label>
        <input type="file" className='file mt-1' id='fileUpload' onChange={imageUpdate} />
      </div>
      <div className='col mt-4'>
      <button type='button' id='btnAdd' className='btn btn-success' onClick={doStyle}><FontAwesomeIcon icon={faPlusCircle} /> Style </button>
      </div>
    </div>
  );

}

export default AddStyles;