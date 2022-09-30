import "./SearchBar.css";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBreed } from "../../Redux/actions";

export default function SearchBar(){

const dispatch = useDispatch();



const [name, setName] = useState("");


function handleInputName(e) {
    e.preventDefault();
    setName(e.target.value);
}

function handleSubmitSearch(e) {
    e.preventDefault();
    dispatch(searchBreed(name));
}


    return(
        <div className="search-bar">
            <h2 className="search-title">Do a search:</h2>
            <input 
                className="search-input"
                type="text"
                placeholder="Search Breed..."
                autoComplete="off"
                onChange={(e) => handleInputName(e)} 
            />
            <button className="btn-search" type="submit" onClick={(e) => handleSubmitSearch(e)}>Search</button>
        </div>
        );
}