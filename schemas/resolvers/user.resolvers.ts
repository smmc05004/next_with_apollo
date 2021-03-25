// const models = require("../../sqlz/models");
// console.log("models: ", models);
// const User = require("../../sqlz/models").User;
import { User } from "../../sqlz/models/user";

module.exports = {
  Query: {
    users: async () => await getUsers(),
  },
};

const getUsers = () => {
  const result = User.findAll();
  return result;
};
export {};
