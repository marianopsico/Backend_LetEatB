import { State } from "../Models/index.js";

const stateSeed = async () => {
  try {
    await State.bulkCreate([
    
        { stateDescription: "ACTIVO" },
        { stateDescription: "INACTIVO" },
        { stateDescription: "SUSPENDIDO" }, 
        
    ]);
  } catch (error) {
    console.log(error.message)
  }
};

export default stateSeed