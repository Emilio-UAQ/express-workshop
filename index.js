const bodyParser = require( 'body-parser');
const morgan = require( 'morgan');
const express = require( 'express');
const app = express();
const pokemon = require( './routes/pokemon.js');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.status (200).send(`<p>Bienvenido a la Pokédex</p><p>Agrégale a la url lo siguiente para diversos efectos:</p><p>--> /pokemon para mostrar la Pokédex de Kanto completa</p><p>--> /pokemon/'el número de la Pokédex del Pokémon deseado' para mostrar dicho Pokémon</p><p>--> /pokemon/'el nombre del Pokémon deseado' para mostrar dicho Pokémon</p>`);
});

app.use("/pokemon", pokemon);

app.listen (process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
