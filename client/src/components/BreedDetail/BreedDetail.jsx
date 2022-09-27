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
    
    console.log(props.match.params.id);
    console.log(detail);
    /*  console.log(detail);
    if (breedDb) {
        let breedFromDb = allBreeds.filter(e => e.id === props.match.params.id)
        
        return(
            <div className="container-detail">
                <div>
                    <Link to='/home'>
                        <button className='btn-home-detail'>Press to Home!</button>
                    </Link>
                </div>
                <div>
                    <h1 className="title-detail">{breedFromDb[0].name}</h1>
                    <img src={breedFromDb[0].image} alt="videogame" />
                    <p>Height:  {breedFromDb[0].height}</p>
                    <p>Weight:  {breedFromDb[0].weight}</p>
                    <p>Life Span: {breedFromDb[0].life_span}</p>
                    <p>Temperaments: {breedFromDb[0].temperaments.map(e => e.name).join(', ')}</p>
                </div>
            </div>
        );
    }else{ */


    return breedLoad?
    <>
        <h1 className="loading-detail">Loading...</h1>
        <img className='img-loading-detail' src={loading} alt="loading" width='600px' height='800px'/>
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
                <img className="img-detail" src={detail.image} alt="videogame" />
                <p className="detail-info">Height: {detail.height}</p>
                {
                    isNaN(detail.id)?
                    <p className="detail-info">Weight: {detail.weight}</p>
                    :<p className="detail-info">Weight: {detail.weight.join(' - ')}</p>
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