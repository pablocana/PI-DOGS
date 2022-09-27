import './Card.css';
import React from "react";

export default function Card(props) {

    function tempsRender(){
        let temperaments = props.temperaments;

        if(isNaN(props.id)){
            temperaments= props.temperaments.map(e =>(e.name)).join(', ');
            return temperaments;
        } else {
            return temperaments;
        }
    }

    return (
        <div className="card" key={props.id}>
            <img className='img-card' src={props.image} alt={`Breed id:${props.id}`} width="300px" height="250px" />
            <h3 className="breed_card">{props.name}</h3>
            <div>Tempetament:
                <h5 className="temperaments-card">{tempsRender()}</h5>
                {/* {
                    isNaN(props.id)?
                    props.temperaments.map(e =>(
                        <h5 className="temperaments-card">{e.name}</h5>
                        ))
                    :<h5 className="temperaments-card">{props.temperaments}</h5>
                } */}
                
            </div>
        </div>
    );
}