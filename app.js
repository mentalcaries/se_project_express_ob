const express = require('express');

const { errorHandler } = require('./middlewares/errorHandler'); //this

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { celebrate, Joi, errors } = require('celebrate');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cors = require('cors');

const Router = require('./routes/index');

require('dotenv').config();

const app = express();

const { PORT = 3003 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/', Router);
app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
