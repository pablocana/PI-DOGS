import "./SearchBar.css";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBreed } from "../../Redux/actions";

export default function SearchBar({ setCurrentPage }){

const dispatch = useDispatch();


const [name, setName] = useState("");


function handleInputName(e) {
    e.preventDefault();
    setName(e.target.value);
}

function handleSubmitSearch(e) {
    e.preventDefault();
        dispatch(searchBreed(name));
        setCurrentPage(1);
        
        //e.target.value =""; // ver porque no anda para limpiar el input.
}


    return(
        <div className="search-bar">
            <h5 className="search-title">Do a search:</h5>
            <input 
                type="text" 
                placeholder="Search Breed..."
                autoComplete="off"
                onChange={(e) => handleInputName(e)} 
            />
            <button type="submit" onClick={(e) => handleSubmitSearch(e)}>Search</button>
        </div>
        );
}