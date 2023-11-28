import express from 'express';
import AuthRoute from './routes/routes.js';
import cors from 'cors'
import session from 'express-session';
import connectdb from './db/connectdb.js';
import 'dotenv/config';

const app = express();

const session_secret = process.env.SESSION_SECRET || 'Dummy Secret';

app.use(
  session({
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1800000 },
  })
);

app.use(cors());
app.use(express.json());

const port = 5000;

app.use('/', AuthRoute)

const start = async () => {
  try {
    await connectdb(process.env.DB_URI);
    app.listen(port, () => console.log(`App listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
}

start();
