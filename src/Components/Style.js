import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faWandMagic } from '@fortawesome/free-solid-svg-icons';
import './Style.css';

function Style(props){
  const[name,setName] = useState("");
  const[description,setDescription] = useState("");
  const[time_period,setTime_period] = useState("");
  const[rank,setRank] = useState("");
  const[editMode, setEditMode] = useState(false);



  useEffect(() => {
    setName(props.style.name);
    setDescription(props.style.description);
    setTime_period(props.style.time_period);
    setRank(props.style.rank);
  }, []);

  const saveStyle = () => {
    setEditMode(false);
    const updatedStyle = {name:name, description:description, time_period:time_period, rank:rank, id:props.style.id, image:props.style.image};
    props.updateStyle(updatedStyle);
  }

  return(
  <div className='card'>
  <img src={props.style.image} alt="Style" className='card-img-top mx-auto'/>
  {!editMode && <ul className='list-group list-group-flush'>
    <li className='list-group-item'>{props.style.name}</li>
    <li className='list-group-item'>{props.style.description}</li>
    <li className='list-group-item'>{props.style.time_period}</li>
    <li className='list-group-item'>{props.style.rank}</li>
    <button type='button' className='btn btn-danger' onClick={() => props.removeStyle(props.style)}>Delete <FontAwesomeIcon icon={faCircleXmark} /></button>
    <button type='button' className='btn btn-warning' onClick={()=> setEditMode(true)}>Edit <FontAwesomeIcon icon={faWandMagic} /></button>
  </ul>
  }
  {editMode &&
  <ul className='list-group list-group-flush'>
  <li className='list-group-item'><input type='text' className='form-control' value={name} onChange={(evt) => setName(evt.currentTarget.value)}/></li>
  <li className='list-group-item'><input type='text' className='form-control' value={description} onChange={(evt) => setDescription(evt.currentTarget.value)}/></li>
  <li className='list-group-item'><input type='text' className='form-control' value={time_period} onChange={(evt) => setTime_period(evt.currentTarget.value)}/></li>
  <li className='list-group-item'><input type='text' className='form-control' value={rank} onChange={(evt) => setRank(evt.currentTarget.value)}/></li>
  <li className='list-group-item'><button id='btnSave' className='btn btn-secondary' onClick={saveStyle}>Save</button></li>
</ul>
  }
</div>
  )};

export default Style;