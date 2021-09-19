const morgan = require( 'morgan');
const express = require( 'express');
const app = express();
const pokemon = require( './routes/pokemon');
const user = require( './routes/user');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  console.log("Code: 1");
  return res.status (200).send ("<p>Code: 1</p><p>Bienvenido a la Pokédex</p><p>Agrégale a la url lo siguiente para diversos efectos:</p><p>--> /pokemon para mostrar la Pokédex completa</p><p>--> /pokemon/'el número de la Pokédex del Pokémon deseado' para mostrar dicho Pokémon</p><p>--> /pokemon/'el nombre del Pokémon deseado' para mostrar dicho Pokémon</p>");
});

app.use("/pokemon", pokemon);
app.use("/user", user);

app.use((req, res, next) => {
  return res.status (404).json({ code: 404, message: "URL no encontrada" });
});

app.listen (process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
