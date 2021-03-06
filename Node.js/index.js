const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

mongoose.connect(config.DB_URL, { useNewUrlParser: true })
  .then(() => console.log('connected to db'))
  .catch(err => new Error(err));

app.use(logger('common', { stream: fs.createWriteStream('justgo_server.log', { flags: 'w' }) }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true,
  }))
  .use('/', express.static('public'))
  .use('/api', require('./routes'));

app.listen(8080);
