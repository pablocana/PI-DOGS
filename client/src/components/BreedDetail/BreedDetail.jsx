import "./BreedDetail.css";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../../Redux/actions";
import loading from '../../assets/gifpaw.gif';




export default function BreedDetail(props){

    const dispatch = useDispatch();
    //const allBreeds = useSelector((state) => state.breeds);
    const detail = useSelector((state)=> state.detail);

    const [breedLoad, setBreedLoad] = useState(true);
    

    useEffect(()=>{
        const breed = async() =>{   
            await dispatch(getDetail(props.match.params.id)) 
            setBreedLoad(false);    
            }
        breed(); 
    },[dispatch, props.match.params.id])
    
    //console.log(props.match.params.id);
    //console.log(detail);


    return breedLoad?
    <>
        <h1 className="loading-detail">Loading...</h1>
        <img className='img-loading-detail' src={loading} alt="Loading" width='600px' height='800px'/>
    </>
    :(
        <div className="detail">
            <div>
                <Link to='/home'>
                    <button className='btn-home-detail'>Press to Home!</button>
                </Link>
            </div>
            <div className="detail-container">
                <h1 className="title-detail">{detail.name}</h1>
                <img className="img-detail" src={detail.image} alt={`Breed:${detail.id}`} />
                <p className="detail-info">Height: {detail.height} cm</p>
                {
                    isNaN(detail.id)?
                    <p className="detail-info">Weight: {detail.weight} kg</p>                   //DB
                    :<p className="detail-info">Weight: {detail.weight.join(' - ')} kg</p>      //API
                }
                {
                    isNaN(detail.id)?
                    <p className="detail-info">Life Span: {detail.life_span} years</p>
                    :<p className="detail-info">Life Span: {detail.life_span}</p>
                }
                {
                    isNaN(detail.id)?
                    <p className="detail-info">Temperaments: {detail.temperaments.map(e=>e.name).join(', ')}</p>
                    :<p className="detail-info">Temperaments: {detail.temperaments}</p>
                }
            </div>
        </div>
    )
}