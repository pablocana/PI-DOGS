
const initialState = {
    breeds: [],
    allBreeds: [],
    temperaments: [],
    detail: []
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_BREEDS':
            return {
                ...state,
                breeds: action.payload,
                allBreeds: action.payload
        };

        case 'GET_TEMPS':
            return{
                ...state,
                temperaments: action.payload
            }

        case 'FILTER_BY_TEMPS':
            let dogTemps = state.allBreeds;
            dogTemps = dogTemps.filter(e => e.temperament !== undefined); // si el perro no tiene temperamento no lo muestro.

            let tempFiltered = action.payload === "All Breeds" 
                ? dogTemps 
                : dogTemps.filter(dog =>(
                    dog.temperament.includes(action.payload) // si el perro tiene temperamento y el temperamento es igual al que selecciono lo muestro
                ))

            return{
                ...state,
                breeds: tempFiltered
            }

        case 'FILTER_BY_ORIGIN':
            const originBreed = state.allBreeds;
            const originFiltered = action.payload === "DB"
                ? originBreed.filter(e => e.created_Db)        // usamos el flag
                : originBreed.filter(e => !e.created_Db);
            return {
                ...state,
                breeds: action.payload === 'All Breeds' ? originBreed : originFiltered
            };

        case 'SORT_BY_NAME':
            let sortedBreeds = state.allBreeds;

                if (action.payload === 'ASC') {
                    sortedBreeds = sortedBreeds.sort(function(a, b) {
                        if(a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1;
                        }
                        if(b.name.toLowerCase() > a.name.toLowerCase()) {
                            return -1;
                        }
                        return 0;
                    })
                }

                if (action.payload === 'DESC') {
                    sortedBreeds = sortedBreeds.sort(function(a, b) {
                        if(a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1;
                        }
                        if(b.name.toLowerCase() > a.name.toLowerCase()) {
                            return 1;
                        }
                        return 0;
                    })
                }

                return {
                    ...state,
                    breeds: sortedBreeds
                }
        case 'SORT_BY_WEIGHT':
            let weightBreeds = state.allBreeds;
            weightBreeds = weightBreeds.filter(e => e.weight.length > 4).map(e=> e.weight.split(' - '));
            //weightBreeds = weightBreeds.map(e => [e.weight[0]*1,e.weight[1]*1])
                
                if(action.payload === 'MAX') {
                    weightBreeds = weightBreeds.sort(function(a, b){
                        if(parseInt(a.weight[1]) > parseInt(b.weight[1])){
                            return 1;
                        }
                        if(parseInt(b.weight[1]) > parseInt(a.weight[1])){
                            return -1;
                        }
                        return 0        
                    })
                }

                if(action.payload === 'MIN'){
                    weightBreeds = weightBreeds.sort(function(a, b) {
                        if(parseInt(a.weight[0]) > parseInt(b.weight[0])){
                            return -1;
                        }
                        if(parseInt(b.weight[0]) > parseInt(a.weight[0])){
                            return 1;
                        }
                        return 0;
                    })        
                }
                
            return {
                ...state,
                breeds: weightBreeds
            }

        case 'SEARCH_BREED':
            action.payload = action.payload.filter(e => e.reference_image_id !== undefined && e.name !== "American Pit Bull Terrier")
            action.payload.map(el=>(el.image = `https://cdn2.thedogapi.com/images/${el.reference_image_id}.jpg`))
            return {
                ...state,
                    breeds: action.payload
            }

        case 'CREATE_BREED':
            return {
                ...state,
            }    

        case 'GET_DETAILS':
        return {
            ...state,
                detail: action.payload
        }

        case 'DELETE_BREED':
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default rootReducer;