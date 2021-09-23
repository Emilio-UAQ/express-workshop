module.exports = (req, res, next) => {
  console.log("Code: 1");
  return res.status (200).send ("<p>Code: 1</p><p>Bienvenido a la Pokédex</p><p>Agrégale a la url lo siguiente para diversos efectos:</p><p>--> /pokemon para mostrar la Pokédex completa</p><p>--> /pokemon/'el número de la Pokédex del Pokémon deseado' para mostrar dicho Pokémon</p><p>--> /pokemon/'el nombre del Pokémon deseado' para mostrar dicho Pokémon</p>");
}
