import './LandingPage.css'
import React from "react";
import { Link } from "react-router-dom";


export default function LandingPage() {
  return (
    <div className='landing-container'>
      <div className='landing-text'>
        <h1 >Welcome to Henry Dogs</h1>
        <Link to="/home">
          <button className='btn-landing'>Walk with us!</button>
        </Link>
      </div>
    </div>
  )
}