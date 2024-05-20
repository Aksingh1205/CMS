import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import cors from 'cors'
import bodyParser from 'body-parser'
import entityRoutes from './routes/entityRoutes.js';
import path from 'path'
import { fileURLToPath } from 'url';

//resolving dirname for ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

//routes
app.use('/api', entityRoutes);

//use the client app
app.use(express.static(path.join(__dirname,'/client/dist')))


//rest api
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'/client/dist/index.html'))
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgCyan.white);
});
