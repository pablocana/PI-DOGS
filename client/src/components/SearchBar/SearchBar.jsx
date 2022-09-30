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
    if(!name){
        alert('Please enter a name breed...');
    } else {
        e.preventDefault();
        dispatch(searchBreed(name));
        setName("");
        setCurrentPage(1);
    }
}


    return(
        <div className="search-bar">
            <h2 className="search-title">Do a search:</h2>
            <input 
                className="search-input"
                type="text"
                value={name} 
                placeholder="Search Breed..."
                autoComplete="off"
                onChange={(e) => handleInputName(e)} 
            />
            <button className="btn-search" type="submit" onClick={(e) => handleSubmitSearch(e)}>Search</button>
        </div>
        );
}