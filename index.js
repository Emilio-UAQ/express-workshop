const express = require( 'express');
const app = express();
const { pokemon } = require( './pokedex.json');

app.get('/pokemon', (req, res, next) => {
  res.status (200);
  res.send("Bienvenido a la Pokédex");
});

app.get('/pokemon/all', (req, res, next) => {
  res.status (200);
  res.send(pokemon);
});

app.get('/pokemon/:id([0-9]{1-3})', (req, res, next) => {
  const id = req.params.id - 1;
  if(id >= 0 && id <= 150) {
    res.status (200);
    return res.send(pokemon [req.params.id - 1]);
  }
  res.status (404);
  res.send("Pokémon no encontrado");
});

app.get('/pokemon/:name', (req, res, next) => {
  const name = req.params.name;
  let bool = false;
  for(i = 0; i < pokemon.length; i++) {
    if(pokemon[i].name == name) {
      bool = true;
      res.status (200);
      return res.send(pokemon[i]);
    }
  }
  res.status (404);
  res.send("Pokémon no encontrado");
});

app.listen (process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
