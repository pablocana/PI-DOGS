import './Card.css';
import React from "react";

export default function Card(props) {

    return (
        <div className="card" key={props.id}>
            <img className='img-card' src={props.image} alt={`Breed id:${props.id}`} width="300px" height="250px" />
            <h3 className="breed_card">{props.name}</h3>
            <div>Tempetament:
                <h5 className="temperaments-card">{props.temperament}</h5>
            </div>
        </div>
    );
}