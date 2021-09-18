const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.
conn
  .sync({ force: false }) // { force: true } for development
  .then(() => {
    console.log("[DB]: DB Conectada.");
    server.listen(process.env.PORT || 3000, () => {
      console.log("[SERVER]: Servidor escuchando en http://localhost:3001/"); // eslint-disable-line no-console
    });
  })
  .catch((e) => console.log("[DB]: Error en conexion con DB: ", e));
