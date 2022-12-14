import "./NavBar.css";
import React from "react";
import { NavLink } from 'react-router-dom';


export default function NavBar() {

    return (
        <div className="nav-bar">
            <div className="title">
                <p>
                    <NavLink className="link-home-landing" exact to="/">
                        PI-Dogs - Pablo Canavesi
                    </NavLink>
                </p>
            </div>
            <div className="link-social">
                <a href="https://www.linkedin.com/in/pablo-canavesi-b1381485/" target='_blank' rel='noopener noreferrer' ><i className="fab fa-linkedin"></i></a>
                <a href="https://github.com/pablocana" target='_blank' rel='noopener noreferrer' ><i className="fab fa-github-square"></i></a>
            </div>
            <div>
                <ul className="list">
                    <li className="list-item">
                        {/* <NavLink exact to="/home"> Home </NavLink> */}
                    </li>
                    <li className="list-item">
                        <NavLink exact to="/create"> Create breed </NavLink>
                    </li>
                    <li className="list-item">
                        {/* <NavLink exact to="/about"> About </NavLink> */}
                    </li>
                </ul>
            </div>
        </div>
    )
}