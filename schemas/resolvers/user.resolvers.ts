const models = require("../../sqlz/models");
const { User } = models.default.models;

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
