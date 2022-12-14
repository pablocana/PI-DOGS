import "./CreateBreed.css";
import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBreed, getTemps } from "../../Redux/actions";



export default function CreateBreed({ setCurrentPage }){

    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector(state => state.temperaments);
    const breeds = useSelector(state => state.allBreeds);

    const[input, setInput] = useState({
        name:'',
        height:'', 
        weight:'', 
        life_span:'', 
        image:'', 
        temperament: [],
    });
    
    const [errors, setErrors] = useState({});       
    const [buttonEnabled, setButtonEnabled] = useState(false);
    //const [render, setRender] = useState('');

    // FUNCION VALIDADORA.

function validate(input){
    let errors = {};
    const regexName = /^[a-zA-Z ]+$/;
    const regexNumber = /\d\d - \d\d/;
    const regexNumberLife_span = /\d\d/;
    //const regexUrl = /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;

    if(!input.name /* || input.name !== regexName.test(input.name )*/){                   // si en mi estado local name=null => en mi object.name= msg.
        errors.name = 'Name is required, please use only letters';
        setButtonEnabled(false);
    }else if(!regexName.test(input.name)){
        errors.name = 'Please, use only letters'
        setButtonEnabled(false);
    } else if (input.name.length < 4) {
        errors.name = 'Name field must be at least 4 characters long';
        setButtonEnabled(false);
    }

    if(!input.height){
        errors.height = 'Height is required, please use this format: 10 - 99';
        setButtonEnabled(false);
    }else if(!regexNumber.test(input.height)){
        errors.height = 'Please respect the format';
        setButtonEnabled(false);
    } else if((input.height[0]+input.height[1]) > (input.height[5]+input.height[6])){
        errors.height = 'Maximum height must be greater than minimum height';
        setButtonEnabled(false);
    }


    if(!input.weight){
        errors.weight = 'Weight is required, please use this format: 01 - 99';
        setButtonEnabled(false);
    }else if(!regexNumber.test(input.weight)){
        errors.weight = 'Please respect the format';
        setButtonEnabled(false);
    } else if((input.weight[0]+input.weight[1]) > (input.weight[5]+input.weight[6])){
        errors.height = 'Maximum weight must be greater than minimum weight';
        setButtonEnabled(false);
    }
    

    if(!regexNumberLife_span.test(input.life_span)){
        errors.life_span = 'Please write a number';
    } else if(input.life_span > 30) {
        errors.life_span = 'Life span must be under 30 years';
    }

    /* if(!regexUrl.test(input.image))
        errors.image = 'Wrong format link';   */  
    

    if (Object.entries(errors).length === 0) setButtonEnabled(true); // Object.entries me devuelve un array [key,value]

    return errors;
};


    useEffect(()=> {
        dispatch(getTemps())
    }, []);


    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value         // estamos asignandole el valor a la prop e.target.name que corresponda con el name que me pasan.
        });
        //console.log(input);
        setErrors(validate({                         // aca seteamos el estados errors.
            ...input,
            [e.target.name] : e.target.value
        }));
        //console.log(input);
    };


    function handleSelect(e){
    //const { value } = e.target;                                                                                       // podemos hacer destructuring del e.target, si lo vamos a usar varias veces dentro de la function.
        if (input.temperament.includes(e.target.value))     
            return alert("You've already selected that temperament");
        
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]                                                         // (voy guardando en un arreglo todo lo del select).
        });
        setErrors(validate({
            ...input,
            temperament: [...input.temperament, e.target.value],
        }))
    };


    function handleSubmit(e){
        e.preventDefault();
        if(breeds.find(e => e.name.toLowerCase() === input.name.toLowerCase())){
            return alert('Breed name already exists');
        }else{
            dispatch(createBreed(input))
                alert("Dog breed successfully created!")
                setInput({
                    name:'',
                    height:'', 
                    weight:'', 
                    life_span:'', 
                    image:'', 
                    temperament: [],
                });
            history.push("/home");
        };                         
    };

    // CLEAR TEMP.
    function handleReset(){
        setInput({
            ...input,
            temperament: []
        });
    };

    function handleClean(e) {
        //console.log(e);
        console.log(e.target.value);
        /* setInput({
            ...input,
            temperament: input.temperament.filter(e => e !== e.target.innerText)
        }) */
    }


    return(
        <div className="create-back">
            
            <div className="title-create">
                <h1>Create your own Breed!</h1>
            </div>
            <Link  to="/home"><button className="link-create-home">Press to Home</button></Link>
            <div className="create-container">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="div-label-input">
                        <label className="label-form">*Name: </label>
                        <input 
                            className="input-form"
                            type="text"
                            value={input.name}
                            name="name"
                            autoComplete="off"
                            placeholder="  Name"
                            onChange={(e)=>handleChange(e)}
                        />
                        {
                            errors.name && (                                // si errors.name, renderizame un <p> con ese error.
                                <p className="error">{errors.name}</p>
                            )
                        }
                    </div>
                    <div className="div-label-input">
                        <label className="label-form">*Height: </label>
                        <input 
                            className="input-form"
                            type="text"
                            value={input.height}
                            name="height"
                            autoComplete="off"
                            placeholder="  10 - 99"
                            onChange={(e)=>handleChange(e)}
                        />
                        <label className="back-label"> min - max cm</label>
                        {
                            errors.height && (                               
                                <p className="error">{errors.height}</p>
                            )
                        }
                    </div>
                    <div className="div-label-input">
                        <label className="label-form">*Weight: </label>
                        <input 
                            className="input-form"
                            type="text"
                            value={input.weight}
                            name="weight"
                            autoComplete="off"
                            placeholder="  01 - 99"
                            onChange={(e)=>handleChange(e)}
                        />
                        <label className="back-label"> min - max kg</label>
                        {
                            errors.weight && (                                // si errors.name, renderizame un <p> con ese error.
                                <p className="error">{errors.weight}</p>
                            )
                        }
                    </div>
                    <div className="div-label-input">
                        <label className="label-form">Life Span: </label>
                        <input 
                            className="input-form"
                            type="text"
                            value={input.life_span}
                            name="life_span"
                            autoComplete="off"
                            placeholder="  30"
                            onChange={(e)=>handleChange(e)}
                        />
                        <label className="back-label"> years</label>
                        {
                            errors.life_span && (                               
                                <p className="error">{errors.life_span}</p>
                            )
                        }
                    </div>
                    <div className="div-label-input">
                        <label className="label-form">Image: </label>
                        <input 
                            className="input-form"
                            type="text"
                            value={input.image}
                            name="image"
                            autoComplete="off"
                            placeholder="  insert image URL"
                            onChange={(e)=>handleChange(e)}
                        />
                        {/* {
                            errors.image && (                                // si errors.name, renderizame un <p> con ese error.
                                <p className="error">{errors.image}</p>
                            )
                        } */}
                    </div>
                    <div>
                        <fieldset className="fieldset">
                            <select className="select-form"defaultValue={'default'}
                                    onChange={(e)=>handleSelect(e)}>
                            <option value='default' disabled>Temperaments:</option>
                                {
                                    temperaments.map(t=>(
                                        <option value={t.name}>{t.id}-{t.name}</option>
                                    ))
                                }
                            </select>
                            <ul>
                                {
                                    input.temperament?.map(e=>{
                                        return (<li onClick={(e)=>handleClean(e)}
                                        value={e}
                                        key={e}
                                        >{e}</li>)
                                    }
                                )
                                }
                                {/* <li onClick={(e)=>handleClean(e)}>{input.temperament.map(e=>e +" - ")}</li> */}
                            </ul>                                        {/* para renderizar cada e que marque del select */}
                            <button type='button' className="reset-temps" onClick={handleReset}>Clear Temperaments</button>    
                        </fieldset>
                    </div>
                    <button className="submit-create" type="submit" disabled={!buttonEnabled}>Create Breed</button>       {/* Aca le pasamos el estado buttonEnabled */}
                </form>
            </div>
        </div> 
    );
};