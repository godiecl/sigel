console.log('Hola desde node');

const express = require('express');
const cors = require('cors');

// crea el servidor
const app = express();

// cors 
app.use( cors() );

// middlewares
// lectura y parseo del body  
app.use(express.json());


app.use(express.urlencoded({extended: false}));

// routes
app.use(require('./routes/index'));

app.listen(3000);
console.log('Server on port 3000');