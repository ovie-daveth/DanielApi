import express from 'express';
import AuthRoute from './routes/routes.js';
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

app.use('/', AuthRoute)

app.listen(port,()=>{console.log(`App listening on ${port}`)})