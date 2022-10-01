import axios from "axios";


export function getBreeds(){
    return async function(dispatch){
        // aca es donde sucede toda la conexion entre el front y el back.
        var json = await axios.get("/dogs/");       // http://localhost:3001
        //axios x default te hace el get 
        return dispatch({ 
            type:'GET_BREEDS',
            payload: json.data
        })
    }
}


export function getTemps(){
    return async function(dispatch){
        var json = await axios.get("/temperaments");
        return dispatch({
            type: 'GET_TEMPS',
            payload: json.data
        })
    }
}


export function filterBreedsByTemps(payload) {
    return {
        type: 'FILTER_BY_TEMPS',
        payload
    }
}


export function filterBreedsByOrigin(payload) {
    return {
        type: 'FILTER_BY_ORIGIN',
        payload
    }
}


export function sortBreedsByName(payload) {
    return {
        type: 'SORT_BY_NAME',
        payload
    }
}


export function sortBreedsByWeight(payload){
    return {
        type: 'SORT_BY_WEIGHT',
        payload
    }
}


export function searchBreed(name) {
    return async function(dispatch) {

        try{
            var json = await axios.get(`/dogs?name=${name}`);
            return dispatch({
                type: 'SEARCH_BREED',
                payload: json.data
            })   
        } catch(error){
            alert("Breed not found")
        }    
    }
}



export function createBreed(payload) {                             
    return async function(dispatch) {
        var json = await axios.post('/dogs/', payload);            // aca le digo que en esta ruta, quiero hacer un post del payload.
        return json;                                                                    // no usamos el dispatch.
    }
}


export function getDetail(id) {
    return async function(dispatch) {
        var json = await axios.get(`/dogs/${id}`);
        return dispatch({
            type: 'GET_DETAILS',
            payload: json.data
        })
    }
}


export function deleteBreed(id) {
    return async function(dispatch) {
        var json = await axios.delete(`/breed/${id}`);
        return json;
    }
}
