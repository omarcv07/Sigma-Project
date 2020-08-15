const express = require('express');
const departamentosJSON = require('./utils/departamentosData')
const ciudadesJSON = require('./utils/ciudadesData')
const bodyParser = require('body-parser')
const saveContactInformation = require('./utils/saveContactInformation')

const app = express()
const port = 8080; 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Para resolver bloqueo CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/sendContactInformation', (req, res) => {
  const contactInformation = req.body

  if (!contactInformation) {
    return res.send({ message: 'Por favor, complete el formulario' })
  }

  saveContactInformation(contactInformation, (error, data) => {
    if (error) {
      return res.send({ error })
    }
    
    res.send({ data })
  });
});

// Principal Web Page 
app.get('/', (req, res) => {
  res.send('<h1>JSON Store</h1> </br> http://localhost:8080/departamentos </br> http://localhost:8080/ciudades');
});

// Departamentos
app.get('/departamentos', (req, res) => {

  departamentosJSON.then(departamentos => {      
    departamentos = Object.keys(JSON.parse(departamentos.body))

    res.send({
      departamentos
    })
  }).catch(error => {
      return res.send({ error })
  });

})

// Ciudades 
app.get('/ciudades', (req, res) => {

  ciudadesJSON.then(ciudades => {      
    ciudades = Object.values(JSON.parse(ciudades.body))

    res.send({
      ciudades
    })
  }).catch(error => {
      return res.send({ error })
  });

})

// port 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});