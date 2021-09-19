const express = require( 'express');
const pokemon = express.Router();
const db = require( '../config/database');

pokemon.post('/', async (req, res, next) => {
  const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
  if (pok_name && pok_height && pok_weight && pok_base_experience) {
    let query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
    query += ` VALUES ('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
      return res.status (201).json({ code: 201, message: "Pokémon insertado correctamente"});
    }

    return res.status (500).json({ code: 500, message: "Ocurrió un error"});
  }
  return res.status (500).json({ code: 500, message: "Campos incompletos"});
});

pokemon.get('/', async (req, res, next) => {
  const pkmn = await db.query("SELECT * FROM pokemon");
	return res.status(200).json({ code: 200, message: pkmn });
});

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
	const id = req.params.id;
	if (id >= 1 && id <= 722) {
		const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id = " + id + ";");
  	return res.status(200).json({ code: 200, message: pkmn });
	}
	return res.status(404).send({ code: 404, message: "Pokémon no encontrado" });
});

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
  const name = req.params.name;
  const pkmn = await db.query("SELECT * FROM pokemon WHERE UPPER(pok_name) = UPPER('"+name+"');");
  if (pkmn.length > 0) {
    return res.status(200).json({ code: 200, message: pkmn });
  }
  return res.status(404).send({ code: 404, message: "Pokémon no encontrado" });
})

module.exports = pokemon;
