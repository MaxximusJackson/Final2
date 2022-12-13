import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import React, {useState,useEffect} from 'react';
import AddStyles from './Components/AddStyles.js';
import _ from 'lodash';
import Style from './Components/Style.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function App() {

const [allStyles,setAllStyles] = useState(null);
const [searchResults, setSearchResults] = useState(null);
const [keywords, setKeywords] = useState("");
const [time_period, setTime_period] = useState("");


useEffect(() => {
  
    saveStyles(styles);
  //}
  
}, []);


const saveStyles = (styles) => {
  setAllStyles(styles);
  setSearchResults(styles);
  if(localStorage){
    localStorage.setItem('styles', JSON.stringify(styles));
    console.log('saved to local storage');
  }
}

const addStyles = (newStyles) => {
  const updatedStyles = [...allStyles, newStyles];
  saveStyles(updatedStyles);
}

const searchStyles = () => {
  let keywordsArray = [];

  if(keywords){
    keywordsArray = keywords.toLowerCase().split(' ');
  }


  if(time_period){
    keywordsArray.push(time_period.toString());
  }


  if(keywordsArray.length > 0){
    const searchResults = allStyles.filter(style => {
      for(const word of keywordsArray){
        if(style.name.toLowerCase().includes(word) ||
        style.description.toLowerCase().includes(word) ||
        style.time_period === parseInt(word)){
          return true;
        } 
      }
      return false;
    });
    setSearchResults(searchResults);
  } else {
    setSearchResults(allStyles);
  }


}

const removeStyle = (styleToDelete) => {
  console.table(styleToDelete);
  const updatedStylesArray = allStyles.filter(style => style.id !== styleToDelete.id);
  saveStyles(updatedStylesArray);
}

const updateStyle = (updatedStyle) => {
  // console.table(updatedStyle);
  const updatedStylesArray = allStyles.map(style => style.id === updatedStyle.id ? {...style,...updatedStyle } : style);
  saveStyles(updatedStylesArray);
}

  const styles = [
    {
      id: nanoid(),
      name: 'Chibi Style',
      description:
        'Description: Childish nature, characters appear younger.',
      time_period: 1980,
      image:'images/style1.jpg',
      rank: 1
    },
    {
      id: nanoid(),
      name: 'Shounen Style',
      description:
        'Description: Sharp with colors popping and simple palettes.',
      time_period: 1900,
      image:'images/style2.jpg',
      rank: 2
    },
    {
      id: nanoid(),
      name: 'Realistic Style',
      description:
        'Description: No huge eyes, has a nose, appears more realistic.',
      time_period: 1980,
      image:'images/style3.jpg',
      rank: 3
    },
    {
      id: nanoid(),
      name: 'Moe Style',
      description:
        'Description: Slim body with bigger head to look childlike.',
      time_period: 1940,
      image:'images/style5.jpg',
      rank: 4
    },
  ];

  

  return (
    <div className="container">
      <div className='row' id='allStyles'>
        <h3>Current Styles</h3>
      {searchResults && searchResults.map((style) => 
      (
      <div className='col-md-3 text-center' key={style.id}>
      <Style style={style} removeStyle={removeStyle} updateStyle={updateStyle}/>
    </div>)
      )}


        
        
      </div>
      {/* {!allStyles && <button type="button" className='btn btn-success btn-lg' onClick={() => saveStyles(styles)}>Save Styles</button>} */}
      <AddStyles addStyles={addStyles} />
      <div className='row mt-4' id='searchStyles'>
        <h3>Style Search</h3>
        <div className='col-md-4'>
          <label htmlFor='txtKeywords'>Search by Name or Description</label>
          <input type="text" className='form-control' placeholder='Name or Description' onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords}/>
        </div>
        <div className='col-md-4 mt-4'>
        <select value={time_period} onChange={evt => setTime_period(evt.currentTarget.value)} className='form-select'>
        <option value="">Select Time</option>
        {_(allStyles).map(style => style.time_period).sort().uniq().map(year => <option key={year} value={year}>{year}</option>).value()}
        </select>
        </div>
        <div className='col-md-4 mt-4'>
        <button type='button' className='btn btn-primary' onClick={searchStyles}>Search Styles <FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </div>
      </div>
    </div>
  );
}

export default App;
