import "./Paginated.css"
import React from "react";


export default function Paginated({ breedsPerPage, allBreeds, paginate }) {

    const pageNumbers = [];
    
    for(let i = 1; i <= Math.ceil(allBreeds/breedsPerPage); i++) {  // redondeamos para arriba.
        pageNumbers.push(i);
    };

    return (
        <div className="paginated-container">
            <nav>
                <ul className="paginated-bar">
                    {
                        pageNumbers && pageNumbers.map(number => (
                            <li className="number" key={number}>
                                <button onClick={() => paginate(number)}>{number}</button>
                            </li>
                        )) 
                    }
                </ul>
            </nav>
        </div>
    )
}