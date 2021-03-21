const User = require("../../models").User;

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
