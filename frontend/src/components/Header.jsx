import React, { useContext, useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';
import Dropdown from 'react-dropdown';
import select from 'react-select';
import 'react-dropdown/style.css';
import './header.css'
import {DatePicker} from 'antd';
import 'antd/dist/reset.css';
import moment from "moment";
import dataContext from '../context/dataContext';
const {RangePicker} = DatePicker;

const Header = () => {
    const [url,setUrl] = useState("/cities");
    const {data, loading, error, reFatch}=useFetch(url);
    const options = data;
    const [date, setDate] = useState([]);
    const [val, setVal]=useState("");
    
    const {datastate, updateData} = useContext(dataContext);
    

    const handleClick =(e)=>{
      // console.log("val",val," e.val",e);
      // console.log(s);
      setVal(e.value);
      console.log("val",val);
      // console.log("val",val);
      

      console.log(url);
      
      // console.log("data",data);
    }
    useEffect(()=>{
      console.log(val);
      
      updateData(val);
    },[val])
    useEffect(()=>{
      console.log(url);
      setUrl(`/citywiseproperty?city=${datastate}`);
      reFatch();
      updateData(data);
    },[url])
    
  return (
    <>
    <div className='header'>
        <div className="dropdown">
          <span>Select location</span>
           <Dropdown className='box' onChange={handleClick} options={options} placeholder="select location" />
        </div>
        <div className="datepicker">
          <span>Select date</span>
          <RangePicker 
            onChange={(values)=>{
              const start=moment(values[0]).format('DD-MM-YYYY');
              const end=moment(values[1]).format('DD-MM-YYYY');
              setDate([start,end]);
            }}
          />
        </div>
        <div className="Pricerange">
          <span>select price range</span>
          <div className="input">
            <input className='min' type='number'  placeholder='min'/>
            <input className='max' type='number' placeholder='max'/>
          </div>
          
        </div>
        <div className="proptype">
          <span>select property type</span>
          <div className="input">
            <input type='text' placeholder='type'/>
          </div>
          
          
        </div>
      
    </div>
    </>
  )
}

export default Header;
