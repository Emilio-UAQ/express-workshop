const express = require( 'express');
const pokemon = express.Router();
//const pk = require( '../pokedex.json').pokemon;
const db = require( '../config/database.js');

pokemon.post('/', (req, res, next) => {
  res.status (200);
  return res.send(req.body);
});

pokemon.get('/', async (req, res, next) => {
  const pkmn = await db.query("SELECT * FROM pokemon");
  console.log(pkmn);
  res.status (200);
  return res.json(pkmn);
});

pokemon.get('/:id([0-9]{1,3})', (req, res, next) => {
  const id = req.params.id - 1;
  if(id >= 0 && id <= 150) {
    res.status (200);
    return res.send(pk [req.params.id - 1]);
  }
  res.status (404);
  return res.send("Pokémon no encontrado");
});

pokemon.get('/:name([A-Za-z]+)', (req, res, next) => {
  const name = req.params.name;
  const pkmn = pk.filter((p) => {
    return (p.name.toUpperCase() == name.toUpperCase()) ? p : null;
  });
  if (pkmn.length > 0) {
    res.status (200);
    return res.send(pkmn);
  }
  res.status (404);
  return res.send("Pokémon no encontrado");
})

module.exports = pokemon;
