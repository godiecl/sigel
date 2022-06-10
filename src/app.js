import express from 'express';
import userRoutes from './routes/user.js';
import cors from 'cors';

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


// middlewares
// lectura y parseo del body  
app.use(express.json());


app.use(express.urlencoded({extended: false}));

app.use('/api',userRoutes);


export default app;