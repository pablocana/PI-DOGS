import "./Home.css";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds, getTemps, filterBreedsByOrigin, filterBreedsByTemps, sortBreedsByName } from "../../Redux/actions";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Paginated from "../Paginated/Paginated";
import SearchBar from "../SearchBar/SearchBar";
import SortBar from "../SortBar/SortBar";
import FilterBar from "../FilterBar/FilterBar";
import Card from "../Card/Card";
//import  back_home_img  from '../../assets/homeback.jpg'


export default function Home() {

    const dispatch = useDispatch();

    //ESTADOS
    
    
    //BREEDS STATE
    const allBreeds = useSelector((state) => state.breeds); // => es lo mismo que el mapStateToProps.
    const temperaments = useSelector((state) => state.temperaments);

    // const [temps, setTemps] = useState([]);
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

    // GET TEMPS.
    useEffect(() =>{
        const temps = async () => {
            await dispatch(getTemps());
            //setTemps()
            //console.log(temperaments)
        }
        console.log(temperaments)
        temps();
        console.log(temperaments)
        //setRender('')
        //dispatch(getTemps());
    }, [dispatch])


// RELOAD DOGS
    function handleClick(e){                           
        e.preventDefault();
        dispatch(getBreeds());
    };


//    


//FILTERS AND SORTERS: // corregir filtrado en DB cn sort.


    function handleOriginFilter(e) {
        setCurrentPage(1);
        dispatch(filterBreedsByOrigin(e.target.value));
    }

    function handleTempsFilter(e) {
        e.preventDefault(e);
        dispatch(filterBreedsByTemps(e.target.value));
        setCurrentPage(1);
    }


    function handleSortName(e) {
        e.preventDefault();
        dispatch(sortBreedsByName(e.target.value));
        setCurrentPage(1);
        setRender(`Sort ${e.target.value}`) // me modifica el estado local y se rerenderiza. //VER DE QUE OTRA FORMA PUEDO RERENDER.
    }


        return(
            <div className="home">
                {/*<img src={back_home_img} width='100%' height='100%' alt="" />*/}
                <div className="nav">
                    <NavBar/>
                </div>
                    <h1>Aca tan los Doguis</h1> 
                    <button className="reload" onClick={e => {handleClick(e)}}>Reload Dogs</button>
                <div className="search">
                    <SearchBar setCurrentPage={setCurrentPage} />
                </div>
                <div className="sorter">
                    <SortBar 
                        handleSortName={handleSortName}
                        /* handleSortWeight={handleSortWeight} *//>                                                     
                </div> 
                <div className="filter">
                    <FilterBar 
                        handleOriginFilter={handleOriginFilter}
                        handleTempsFilter={handleTempsFilter} 
                        temperament={temperaments} />                                                     
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
                                temperament={e.temperament} />
                            </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }