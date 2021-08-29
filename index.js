const bodyParser = require( 'body-parser');
const express = require( 'express');
const app = express();
const { pokemon } = require( './pokedex.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.status (200).send(`<p>Bienvenido a la Pokédex</p><p>Agrégale a la url lo siguiente para diversos efectos:</p><p>--> /pokemon para mostrar la Pokédex de Kanto completa</p><p>--> /pokemon/'el número de la Pokédex del Pokémon deseado' para mostrar dicho Pokémon</p><p>--> /pokemon/'el nombre del Pokémon deseado' para mostrar dicho Pokémon</p>`);
});

app.post('/pokemon', (req, res, next) => {
  res.status (200);
  return res.send(req.body);
});

app.get('/pokemon', (req, res, next) => {
  res.status (200);
  return res.send(pokemon);
});

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
  const id = req.params.id - 1;
  if(id >= 0 && id <= 150) {
    res.status (200);
    return res.send(pokemon [req.params.id - 1]);
  }
  res.status (404);
  return res.send("Pokémon no encontrado");
});

app.get('/pokemon/:name([A-Za-z]+)', (req, res, next) => {
  const name = req.params.name;
  const pk = pokemon.filter((p) => {
    return (p.name.toUpperCase() == name.toUpperCase()) ? p : null;
  });
  if (pk.length > 0) {
    res.status (200);
    return res.send(pk);
  }
  res.status (404);
  return res.send("Pokémon no encontrado");
});

app.listen (process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
