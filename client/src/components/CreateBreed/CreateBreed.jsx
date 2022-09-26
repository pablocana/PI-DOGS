import "./CreateBreed.css";
import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBreed, getTemps } from "../../Redux/actions";



export default function CreateBreed({ setCurrentPage }){

    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector(state => state.temperaments);


    const[input, setInput] = useState({
        name:'',
        height:'', 
        weight:'', 
        life_span:'', 
        image:'', 
        temperament: [],
    });
    
    const [errors, setErrors] = useState({});       
    const [buttonEnabled, setButtonEnabled] = useState(true);
    //const [render, setRender] = useState('');

    // FUNCION VALIDADORA.

function validate(input){
    let errors = {};
    const regexName = /^[a-zA-Z ]+$/;
    const regexNumber = /\d\d - \d\d/;
    //const regexNumberLife_span = /\d\d/;
    //const regexUrl = /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;

    if(!input.name /* || input.name !== regexName.test(input.name )*/){                            // si en mi estado local name=null => en mi object.name= msg.
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
    

    /* if(!regexNumberLife_span.test(input.life_span)){
        errors.life_span = 'Please write a number';
    } else if(input.life_span > 30) {
        errors.life_span = 'Life span must be under 30 years';
    } */

    /* if(!regexUrl.test(input.image))
        errors.image = 'Wrong format link';  */   
    

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
        //setRender('');
        setErrors(validate({                         // aca seteamos el estados errors.
            ...input,
            [e.target.name] : e.target.value
        }));
        //console.log(input);
    };


    function handleSelect(e){
    //const { value } = e.target;                       // podemos hacer destructuring del e.target, si lo vamos a usar varias veces dentro de la function.
        if (input.temperament.includes(e.target.value)) // aca decimos que, si mi estado local input.temp... incluye el value, retorne un alert.
        return alert("You've already selected that temperament");
        
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value] // aca me trae lo que ya habia y le concatena el target.value (voy guardando en un arreglo todo lo del select).
        });
        setErrors(validate({
            ...input,
            temperament: [...input.temperament, e.target.value],
        }))
    };


    function handleSubmit(e){
        e.preventDefault();
        //console.log(input);                  // hacemos aca el console.log xq...
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
        history.push("/home");                // el useHistory es un metodo del router, que sirve para redirijirme a la ruta que yo diga.
        //setCurrentPage(23);
    };

    // CLEAR TEMP.
    function handleReset(){
        setInput({
            ...input,
            temperament: []
        });
    };


    /* const handleDelete = (e) => {
        setInput({
        ...input,
        temperament: input.temperament.filter((c) => c !== e.target.name),
        });
    }; */




    return(
        <>
            <div className="nav-create">
                <Link to="/home"><button>Press to Home</button></Link>
                <h1>Create your own Breed!</h1>
            </div>
            <div className="create-container">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div>
                        <label>*Name: </label>
                        <input 
                            type="text"
                            value={input.name}
                            name="name"
                            autoComplete="off"
                            placeholder="Name"
                            onChange={(e)=>handleChange(e)}
                        />
                        {
                            errors.name && (                                // si errors.name, renderizame un <p> con ese error.
                                <p className="error">{errors.name}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>*Height: </label>
                        <input 
                            type="text"
                            value={input.height}
                            name="height"
                            autoComplete="off"
                            placeholder="10 - 99"
                            onChange={(e)=>handleChange(e)}
                        />
                        <label> cm</label>
                        {
                            errors.height && (                               
                                <p className="error">{errors.height}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>*Weight: </label>
                        <input 
                            type="text"
                            value={input.weight}
                            name="weight"
                            autoComplete="off"
                            placeholder="01 - 99"
                            onChange={(e)=>handleChange(e)}
                        />
                        {/* <input 
                            type="number"
                            value={input.weightmax}
                            name="weight"
                            autoComplete="off"
                            placeholder="00 - 100 kg"
                            onChange={(e)=>handleChange(e)}
                        /> */}
                        <label> kg</label>
                        {
                            errors.weight && (                                // si errors.name, renderizame un <p> con ese error.
                                <p className="error">{errors.weight}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Life Span: </label>
                        <input 
                            type="text"
                            value={input.life_span}
                            name="life_span"
                            autoComplete="off"
                            placeholder="30"
                            onChange={(e)=>handleChange(e)}
                        />
                        <label> years</label>
                        {/* {
                            errors.life_span && (                               
                                <p className="error">{errors.life_span}</p>
                            )
                        } */}
                    </div>
                    <div>
                        <label>Image: </label>
                        <input 
                            type="text"
                            value={input.image}
                            name="image"
                            autoComplete="off"
                            placeholder="image"
                            onChange={(e)=>handleChange(e)}
                        />
                        {/* {
                            errors.image && (                                // si errors.name, renderizame un <p> con ese error.
                                <p className="error">{errors.image}</p>
                            )
                        } */}
                    </div>
                    <div>
                        <fieldset>
                            <select defaultValue={'default'}
                                    onChange={(e)=>handleSelect(e)}>
                            <option value='default' disabled>Temperaments:</option>
                                {
                                    temperaments.map(t=>(
                                        <option value={t.name}>{t.id}-{t.name}</option>
                                    ))
                                }
                            </select>
                            <ul><li>{input.temperament.map(e=>e +" - ")}</li></ul>     {/* para renderizar cada cosa que marque del select */}
                            <button type='button' className="reset-temps" onClick={handleReset}>Clear Temperaments</button>    
                        </fieldset>
                    </div>
                    <button type="submit" disabled={!buttonEnabled}>Create Breed</button>       {/* Aca le pasamos el estado buttonEnabled */}
                </form>
            </div>
        </> 
    );
};