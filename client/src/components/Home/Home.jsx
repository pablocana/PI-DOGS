import "./Home.css";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds, filterBreedsByOrigin, filterBreedsByTemps, sortBreedsByName, sortBreedsByWeight } from "../../Redux/actions";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Paginated from "../Paginated/Paginated";
import SearchBar from "../SearchBar/SearchBar";
import SortBar from "../SortBar/SortBar";
import FilterBar from "../FilterBar/FilterBar";
import Card from "../Card/Card";



export default function Home() {

    const dispatch = useDispatch();

    //ESTADOS
    
    
    //BREEDS STATE
    const allBreeds = useSelector((state) => state.breeds); // => es lo mismo que el mapStateToProps.
    

    //const [temps, setTemps] = useState([]);
    const [render, setRender] = useState(''); // estado Render.
    
    //PAGINADO
    const [currentPage, setCurrentPage] = useState(1);
    const breedsPerPage = 8; // cant por pag.

    const indexLast = currentPage * breedsPerPage; // 8 
    const indexFirst = indexLast - breedsPerPage; // 0
    const currentBreeds = allBreeds.slice(indexFirst, indexLast); // me devuelve una porcion de un arreglo, aca toma desde el index 0 hasta 8. (el 8 no me lo toma, renderiza del 0 al 7 = 8)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }; 


    // GET ALL BREEDS.
    useEffect(() => {
        const doguis = async () => {
            await dispatch(getBreeds())
        }                            // => es lo mismo que el mapDispatchToProps.
    doguis();
    },[dispatch]);                    // para q no se genere un loop inf.



// RELOAD DOGS
    function handleClick(e){                           
        e.preventDefault();
        dispatch(getBreeds());
    };


//FILTERS: // corregir filtrado en DB cn sort.


    function handleOriginFilter(e) {
        setCurrentPage(1);
        dispatch(filterBreedsByOrigin(e.target.value));
    }

    function handleTempsFilter(e) {
        e.preventDefault(e);
        dispatch(filterBreedsByTemps(e.target.value));
        setCurrentPage(1);
    }

// SORTERS:

    function handleSortName(e) {
        e.preventDefault();
        dispatch(sortBreedsByName(e.target.value));
        setCurrentPage(1);
        setRender(`Sort ${e.target.value}`) // me modifica el estado local y se rerenderiza. //VER DE QUE OTRA FORMA PUEDO RERENDER.
    }

    function handleSortWeight(e) {
        e.preventDefault();
        dispatch(sortBreedsByWeight(e.target.value));
        // console.log(e.target.value)  //para ver si llega el payload
        setCurrentPage(1);
        setRender(`Sort ${e.target.value}`)
    }

        return(
            <div className="home">
                <div className="nav">
                    <NavBar/>
                </div>
                    <h2 className="home-title">Come to meet dog breeds!</h2> 
                    <button className="reload" onClick={e => {handleClick(e)}}>Reload Dogs</button>
                <div className="lateral-bar">
                    <div className="search">
                        <SearchBar setCurrentPage={setCurrentPage} />
                    </div>
                    <div className="sorter">
                        <SortBar 
                            handleSortName={handleSortName}
                            handleSortWeight={handleSortWeight}/>                                                     
                    </div> 
                    <div className="filter">
                        <FilterBar 
                            handleOriginFilter={handleOriginFilter}
                            handleTempsFilter={handleTempsFilter} />                                                     
                    </div>    
                </div>
                <div className="paginated" >
                    <Paginated 
                        breedsPerPage= {breedsPerPage}
                        allBreeds= {allBreeds.length}
                        paginate= {paginate}
                    />
                </div>
                <div className="dog-cards">
                    {
                    currentBreeds && currentBreeds.map (e => {
                        return (
                            <Link className='link-card' to={"/detail/" + e.id} key={e.id}>
                                <Card
                                key={e.id}
                                id={e.id}
                                name={e.name}
                                image={e.image}
                                temperaments={e.temperaments} />
                            </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }