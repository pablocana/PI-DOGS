const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const axios = require ('axios');
const { Breed, Temperament } = require ('../db.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getApiInfo = async () => {
    let apiInfo = await axios.get('https://api.thedogapi.com/v1/breeds')
    .then(response => response.data.map(element =>{
      // ver para hacerlo con destructuring.
      return {
        name: element.name,
        image: element.image.url,
        temperament: element.temperament,
        weight: element.weight.metric.split(' - '),      // metric, split => ex: ["a", "b"]
      }
    })
    )
    return apiInfo;
  
};

// TRAER DE DATABASE:
const getDbInfo = async () => {
  const dbDogs = await Breed.findAll({
    include: {
      // traeme temperament,
      model: Temperament,
      // traeme nombre,
      attributes: ['name'],
      // through (mediante) los atributos.
      through: {
        attributes: [],
      },
    }    
  });
  return dbDogs;
};

const getAllDogs = async () => {
  const api = await getApiInfo();
  const db = await getDbInfo();
  
  const totalDogs = api.concat(db);
  return totalDogs;
}



router.get('/dogs', async (req, res) => {
  const { name } = req.query;
  const allDogs = await getAllDogs();

  if(name){
    try {
      const search = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
      //.data te trae siempre array. (array no existe undefined/null)
      if(search.data.length > 0){
        return res.status(200).json(search.data)
      }else {
        return res.status(404).send('dog breed not found');
      }
    } catch (error) {
      return res.status(404).send(error);
    }  
  }else{
    return res.status(200).json(allDogs);
  }
});



router.get('/dogs/:name', async (req, res) => {
  const  { name } = req.params;

  try {
    const dogDetail = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);

    if(dogDetail.data.length > 0){
      return res.status(200).json(dogDetail.data);  
    }else{
      return res.status(404).send('dog breed not found');
    }
  } catch (error) {
    res.status(404).json(error);  
  }
});


// POST
//ver tema validaciones de datos que nos llegan. (averiguar si en back y/o front)
//ver funcion que traiga todos los temperamentos cuando se levanta el server.
router.post('/dogs', async(req, res) => {
  let { name,
        height, 
        weight, 
        life_span, 
        image, 
        temperament, 
        created_Db } = req.body;
  
  try {
    //NO LE PASO temperament XQ TENGO QUE HACER LA RELACION APARTE.
    const newBreed = await Breed.create({name, height, weight, life_span, image, created_Db});
    // EL TEMPERAMENTO LO TENGO QUE ENCONTRAR EN UN MODELO QUE YA TENGO.
    const tempDb = await Temperament.findAll({where: {name: temperament}});
    //A newBreed AGREGALE LOS TEMPERAMENTOS QUE COINCIDAN CON EL name DE tempDb. //addTemperament => metodo de sequelize.
    newBreed.addTemperament(tempDb);
    return res.status(200).send(`New dog breed successfully created!`); 
  } catch (error) {
    return res.status(404).send(error)
  }
});



router.get('/temperaments', async (req, res) =>{
  const tempsApi = await axios.get(`https://api.thedogapi.com/v1/breeds`);
  const temperaments = tempsApi.data.map(e => e.temperament).join(", ").split(", ");
  const temps_Db = temperaments.forEach(e => {
    Temperament.findOrCreate({
      where: {name: e}
    });
  });

  const allTemperaments = await Temperament.findAll(); 
  return res.status(200).json(allTemperaments); 
});


// DELETE

router.delete('/dogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
      let dog = await Breed.destroy({ where: { ID: id } });
      return res.status(200).send("Dog's breed deleted successfully!");
  } catch (error) {
      return res.status(404).send(error);
  }
});



module.exports = router;
