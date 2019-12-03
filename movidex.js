require ('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const moviedex = require('./movies-data.json');

const app = express();

app.use(morgan('dev'));
app.use(validateBearerToken);
app.use(helmet());
app.use(cors());
console.log(process.env.API_TOKEN);

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
  let response = moviedex;
  if(req.query.genre){
    // genre search //
    response = response.filter(movie => movie.genre
      .toLowerCase()
      .includes(req.query.genre.toLowerCase()));
  }

  if(req.query.country){
    // country search //
    response = response.filter(movie => movie.country
      .toLowerCase()
      .includes(req.query.country.toLowerCase()));
  }

  if(req.query.avg_vote){
    // avg_vote //
    response = response.filter(movie => (Number(movie.avg_vote) >= Number(req.query.avg_vote)));
  }

  res
    .json(response);
}

app.get('/movie', handleMovieSearch);

const PORT ='8000';
const baseUrl = 'http://localhost:';
app.listen(PORT, () => {
  console.log(`Express is listening at: ${baseUrl}${PORT}`);
});
