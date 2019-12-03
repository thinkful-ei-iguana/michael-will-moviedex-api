require ('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const moviedex = require('./movies-data.json');

const app = express();

app.use(morgan('dev'));
app.use(validateBearerToken);

function validateBearerToken(req,res,next){
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }

  next();
}

