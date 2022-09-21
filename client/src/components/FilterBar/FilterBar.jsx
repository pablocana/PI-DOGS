import "./FilterBar.css";
import React from "react";


export default function FilterBar({ temperaments, handleOriginFilter, handleTempsFilter }){
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
                    temperaments && temperaments.map(el => (
                        <option value={el}>{el}</option>  
                    ))
                }          
            </select>
        </div>
    );
}