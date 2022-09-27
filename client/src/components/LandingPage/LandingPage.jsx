import './LandingPage.css'
import React from "react";
import { Link } from "react-router-dom";
//import  backimg  from "../../assets/option3.jpg";


export default function LandingPage() {
  return (
    <div className='landing-container'>
      {/* <img src={backimg} width='100%' height='100%' alt="Entry_img" /> */}
      <div className='landing-text'>
        <h1 >Welcome to Henry Dogs</h1>
        <Link to="/home">
          <button className='btn-landing'>Walk with us!</button>
        </Link>
      </div>
    </div>
  )
}