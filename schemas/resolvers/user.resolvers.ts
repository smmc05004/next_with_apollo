const models = require("../../sqlz/models");
const { User } = models.default.models;

interface Porps {
  user_id: string;
  user_name: string;
}

module.exports = {
  Query: {
    users: async () => await getUsers(),
  },
  Mutation: {
    addUser: async (obj: undefined, { user_id, user_name }: Porps) => {
      console.log("obj: ", obj);
      return await insertUser({ user_id, user_name });
    },
  },
};

const getUsers = () => {
  const result = User.findAll();
  return result;
};

const insertUser = ({ user_id, user_name }: Porps) => {
  const result = User.create({ user_id: user_id, user_name: user_name });
  return result;
};
export {};
