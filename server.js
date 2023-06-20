import express from "express";
import routes from "./routes/routes.js";
import { serverPort } from "./config/config.js";
import connectionDb from "./connectionDb/connectionDb.js";
import 'dotenv/config.js';
import cookieParser from "cookie-parser";
import { State, Role, User, Restaurant} from "./Models/index.js"

import userSeed from "./seed/userSeed.js";
import roleSeed from "./seed/roleSeed.js";
import restaurantSeed from "./seed/restaurantSeed.js";
import stateSeed from "./seed/stateSeed.js";

const app = express();

//middleware de aplicacion
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//middlewares de rutas
app.use(routes);

app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .send({ success: false, message: error.message });
});


await connectionDb
  .sync({ force: false })
  .then(() => {
    app.listen(serverPort, () => {
      console.log(`server ok http://localhost:${serverPort}`);
    });
  })

  .then(() => {
    // Ejecutar los seeders solo si no hay registros existentes
    return Promise.all([
      State.count().then(count => count === 0 && stateSeed()),
      Role.count().then(count => count === 0 && roleSeed()),
      User.count().then(count => count === 0 && userSeed()),
      Restaurant.count().then(count => count === 0 && restaurantSeed())
    ]);
  })
