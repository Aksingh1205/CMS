import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import cors from 'cors'
import bodyParser from 'body-parser'
import entityRoutes from './routes/entityRoutes.js';

//configure env
dotenv.config();

//database config
connectDB();

//rest obj
const app = express()

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'))

app.use('/api', entityRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgCyan.white);
});
