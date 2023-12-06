import React, { useContext, useEffect } from 'react'
import './property.css'
import useFetch from '../hooks/useFetch';
import dataContext from '../context/dataContext';
const Property = () => {
    const{data, loading, error, reFatch} = useFetch('/list-properties');
    const {datastate, updateData} = useContext(dataContext);
    updateData(data);
    useEffect(()=>{
        // setUrl(`/citywiseproperty?city=${datastate}`);
        // reFatch();
    },[data])
  return (
    <div className='property'>
      {loading ? ("Loading"):(
        <>
        {data.map((item)=>(
            <div className='propcontainer'>
                <img className='img' src={item.photo}/>
                <div className='info'>
                    <h1>{item.price}/month</h1>
                    <h2>{item.name}</h2>
                    <h1>{item.location}</h1>
                </div>
                <div className='room'>
                    <h1>{item.beds} beds  {item.bathroom} bathrooms  {item.area}</h1>
                    
                </div>
            </div>
        ))
        }
        </>
      )
        
      }
    </div>
  )
}

export default Property;
