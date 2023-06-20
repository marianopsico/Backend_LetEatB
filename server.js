import express from "express";
import routes from "./routes/routes.js";
import connectionDb from "./connectionDb/connectionDb.js";
import 'dotenv/config.js';

import userSeed from "./seed/userSeed.js";
import roleSeed from "./seed/roleSeed.js";
import restaurantSeed from "./seed/restaurantSeed.js";
import stateSeed from "./seed/stateSeed.js";

const port= process.env.SERVER_PORT; // el process es de NODE
const app = express();

//middleware de aplicacion
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//middlewares de rutas
app.use(routes);

await connectionDb
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log("server ok http://localhost:8080");
    });
  })
  .then(stateSeed)
  .then(roleSeed)
  .then(userSeed)
  .then(restaurantSeed)
 
