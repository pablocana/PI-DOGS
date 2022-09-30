
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
            dogTemps = dogTemps.filter(e => e.temperaments !== undefined); // si la raza no tiene temperamento no lo muestro.
            console.log(dogTemps)

            let tempFiltered = action.payload === "All Breeds" 
                ? dogTemps 
                : dogTemps.filter(dog =>(
                    dog.temperaments.includes(action.payload) 
                ));

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
                    });
                };

                if (action.payload === 'DESC') {
                    sortedBreeds = sortedBreeds.sort(function(a, b) {
                        if(a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1;
                        }
                        if(b.name.toLowerCase() > a.name.toLowerCase()) {
                            return 1;
                        }
                        return 0;
                    });
                };

                return {
                    ...state,
                    breeds: sortedBreeds
                }
        case 'SORT_BY_WEIGHT':
            let weightBreeds = state.allBreeds.filter(e => e.weight.length > 1);    
            //console.log(weightBreeds)
                
                if(action.payload === 'MAX') {
                    weightBreeds = weightBreeds.sort(function(a, b){
                        return b.weight[1] - a.weight[1];
                    });
                };
                
                if(action.payload === 'MIN'){
                    weightBreeds = weightBreeds.sort(function(a, b) {
                        return a.weight[0] - b.weight[0];
                    }) ;       
                };
                
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
        default:
            return state;
    }
}

export default rootReducer;