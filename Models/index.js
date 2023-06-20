import Restaurant from "./Restaurant.js";
import Role from "./Role.js";
import State from "./State.js";
import User from "./User.js";

Role.hasMany(User, {
    foreignKey: "roleId",
  });
  User.belongsTo(Role, {
    foreignKey: "roleId",
    as: "role",
  });

  
State.hasMany(Restaurant, {
  foreignKey: "stateId",
});
Restaurant.belongsTo(State, {
  foreignKey: "stateId",
  as: "state"
});

export {State, Role, User, Restaurant };