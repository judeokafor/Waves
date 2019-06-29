import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import passport from 'passport';
import '@babel/polyfill/noConflict';

import './lib/config/dbConfig';
import users from './routes/user';
import brands from './routes/brand';
import woods from './routes/wood';
import passportFunction from './lib/config/passportConfig';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(morgan('dev'));

app.use(passport.initialize());
passportFunction(passport);

app.use('/api/v1/auth', users);
app.use('/api/v1/products', brands);
app.use('/api/v1/products', woods);

const PORT = process.env.PORT || 9999;
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
export default server;
