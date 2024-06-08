const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const http = require('http').createServer(app);

app.use(express.json());

app.use(cors({
    origin: 'http://34.171.31.18:4200',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization'
}));

// Definir una ruta que redirija las solicitudes a la API WildFly

app.get('/list', async (req, res) => {
    const apiUrl = 'http://34.19.97.196:8080/autos/rest/autos' + req.url;
    try {
      const response = await axios({
        method: req.method,
        url: apiUrl,
        data: req.body,
      });
      res.status(response.status).send(response.data);
    } catch (error) {
      if (error.response) {
        res.status(error.response.status).send(error.response.data);
      } else {
        res.status(500).send('Error interno del servidor');
      }
    }
  });

  app.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.get(`http://34.19.97.196:8080/autos/rest/autos/${id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send('Error interno del servidor');
        }
    }
});
  
  app.post('/', async (req, res) => {
    try {
        const response = await axios.post('http://34.19.97.196:8080/autos/rest/autos', req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send('Error interno del servidor');
        }
    }
});

app.put('/', async (req, res) => {
    try {
        const response = await axios.put('http://34.19.97.196:8080/autos/rest/autos', req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send('Error interno del servidor');
        }
    }
});


app.delete('/', async (req, res) => {
    try {
        const codigo = req.query.id;
        const response = await axios.delete(`http://34.19.97.196:8080/autos/rest/autos?id=${codigo}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send('Error interno del servidor');
        }
    }
});

// Iniciar el servidor en el puerto 3000
http.listen(3000, () => {
  console.log('Servidor Node.js ejecutándose en el puerto 3000');
});
