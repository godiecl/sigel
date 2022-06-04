console.log('Iniciando node');

// imports
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// crea el servidor
const app = express();

// directorio publico
app.use( express.static('public'));

// cors 
app.use( cors() );

// middlewares
// lectura y parseo del body  
app.use(express.json());


app.use(express.urlencoded({extended: false}));

// routes
app.use(require('./routes/user'));

app.listen(process.env.PORT);
console.log(`Server on port: ${ process.env.PORT }`);