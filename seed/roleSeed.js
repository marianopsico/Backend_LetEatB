import { Role } from "../Models/index.js";

const roleSeed = async () => {
  try {
    await Role.bulkCreate([{ roleName: "admin" }, { roleName: "user" }, { roleName: "restaurant"}]);
  } catch (error) {
    console.log(error.message)
  }
};

export default roleSeed