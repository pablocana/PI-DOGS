import React from "react";



export default function SortBar({ handleSortName, handleSortWeight }){
    return(
        <div className="sorter-bar">
            <h1>Sort by</h1>
            <div>
            <select onChange={(e) => handleSortName(e)} className='sort-name' defaultValue={'DEFAULT'}>
                <option value='DEFAULT' disabled>Sort By Name</option>
                <option value="ASC">A to Z</option>
                <option value="DESC">Z to A</option>
            </select>
            <select onChange={(e) => handleSortWeight(e)} className='sort-weight' defaultValue={'DEFAULT'}>
                <option value='DEFAULT' disabled>Sort By Weight</option>
                <option value="MAX">Max to Min </option>
                <option value="MIN">Min to Max</option>
            </select>
            </div>
        </div>
    );
}


