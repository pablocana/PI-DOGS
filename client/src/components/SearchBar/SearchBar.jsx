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
        
        //e.target.value =""; // ver porque no anda para limpiar el imput.
}


    return(
        <div className="search-bar">
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