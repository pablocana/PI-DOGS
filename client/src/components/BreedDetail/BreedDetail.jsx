import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../../Redux/actions";




export default function BreedDetail(props){

    const dispatch = useDispatch();
    const allBreeds = useSelector((state) => state.breeds);
    const detail = useSelector((state)=> state.detail);

    const [breedDb, setBreedDb] = useState(false);
    let breedName = props.match.params.name;
    console.log(breedName);

    useEffect(()=>{
        const breed = async() =>{
            if(isNaN(Number(props.match.params.id))) {
                setBreedDb(true);
            } else {
                //console.log(breedName.replace(/%20/g," "));
            await dispatch(getDetail(unescape(breedName)))
                //console.log(detail);
            }
        } 
        breed(); 
    },[dispatch, breedName])

    console.log(detail);
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
    }else{
        return(
            <div>
                    <h1 className="title-detail">{detail.name}</h1>
                    <img src={detail.image} alt="videogame" />
                    <p>Height: {detail.height.metric}</p>
                    <p>Weight: {detail.weight.metric}</p>
                    <p>Life Span: {detail.life_span}</p>
                    <p>Temperaments: {detail.temperaments}</p>
                </div>
        )
    }
}