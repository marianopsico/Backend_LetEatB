import express from "express";
import routes from "./routes/routes.js";
import connectionDb from "./connectionDb/connectionDb.js";
import 'dotenv/config.js';
import User from "./Models/User.js";
import Restaurant from "./Models/Restaurant.js";

const port= process.env.SERVER_PORT; // el process es de NODE
const app = express();

app.use(routes);

await connectionDb.sync( { force: true } ).then(() => {
  app.listen( port , () => {
      console.log('Server ok http://localhost:8080')
  })
}).catch((error) => {
  console.log("Error: ", error);
});;

