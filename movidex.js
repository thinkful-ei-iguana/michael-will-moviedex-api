require ('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors')
const moviedex = require('./movies-data.json');

const app = express();

app.use(morgan('dev'));
app.use(validateBearerToken);
app.use(helmet());
app.use(cors());

function validateBearerToken(req,res,next){
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }

  next();
}
//GENRE, COUNTRY, AVG_VOTE//
function handleMovieSearch(req, res){
  const {genre, country, avg_vote} = req.query;
  const response = moviedex;
  res
    .json(response);
}

app.get('/movie', handleMovieSearch);

