import React from "react";
import { Link } from "react-router-dom";
import  backimg  from "../../assets/dogui_fondoprueba.jpg";


export default function LandingPage() {
  return (
    <div className="container">
        <img src={backimg} width='100%' height='100%' alt="Entry_img" />
      <div className="initial-text">
        <h1>Welcome to Henry Dogs</h1>
        <Link to="/home">
          <button>Walk with us!</button>
        </Link>
      </div>
    </div>
  )
}