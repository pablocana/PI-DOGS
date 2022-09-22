import "./FilterBar.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTemps } from "../../Redux/actions";




export default function FilterBar({ handleOriginFilter, handleTempsFilter }){
    
    const dispatch = useDispatch();
    
    const temperaments = useSelector((state) => state.temperaments);

    // GET TEMPS.
    useEffect(() =>{
        dispatch(getTemps()); 
    }, [dispatch])
    
    
    return(
        <div className="filter-bar">
            <h1>Filter by</h1>
            <select onChange={(e) => handleOriginFilter(e)} className='origin' defaultValue={'All Breeds'}>
                {/* <option value='DEFAULT' disabled>Filter by Origin</option> */}
                <option value="All Breeds">All Breeds</option>
                <option value="API">Breeds from API</option>
                <option value="DB">Breeds from DB</option>
            </select>
            <select className='temps' onChange={(e) => handleTempsFilter(e)} defaultValue={'DEFAULT'}>
                <option value='TEMP' disabled>Filter By Temperaments</option>
                <option value='All Breeds'>All </option>
                {
                    temperaments && temperaments.map(e => (
                        <option value={e.name}>{e.name}</option>  
                    ))
                }          
            </select>
        </div>
    );
}