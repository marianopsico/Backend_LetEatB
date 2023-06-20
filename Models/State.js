import { DataTypes as DT } from "sequelize";
import connectionDb from "../connectionDb/connectionDb.js";

const State = connectionDb.define(
  "State",
  {
    stateDescription: {
      type: DT.STRING,
      defaultValue: "Activo",
    },
  },
  {
    timestamps: false,
  }
);

export default State;