import express from 'express';
import userRoutes from './routes/user.js';
import cors from 'cors';
import multer from 'multer';

//const express =require('express');//
//const cors = require('cors');
//const multer = require('multer');


const app = express();


// cors 
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));

// directorio publico
app.use( express.static('public'));
//contenido practica
app.use( express.static('./public/contenido/practica'));
//contenido capstone
app.use( express.static('./public/contenido/capstone'));

//documentos practica-estudiante
app.use( express.static('./documentos/practica-estudiante'));

// middlewares
// lectura y parseo del body  
app.use(express.json());


app.use(express.urlencoded({extended: false}));

app.use('/api',userRoutes);


export default app;