const models = require("../../sqlz/models");
const { User } = models.default.models;

interface Porps {
  user_id: string;
  user_name: string;
}

interface LoginPorps {
  user_id: string;
}

module.exports = {
  Query: {
    users: async () => await getUsers(),
    user: async (obj: undefined, { user_id }: LoginPorps) => {
      console.log("obj: ", obj);
      console.log("user_id: ", user_id);

      const result = await User.findOne({ where: { user_id: user_id } });
      console.log("result: ", result);

      return result;
    },
  },
  Mutation: {
    addUser: async (obj: undefined, { user_id, user_name }: Porps) => {
      console.log("obj: ", obj);
      return await insertUser({ user_id, user_name });
    },
    login: async (obj: undefined, { user_id }: LoginPorps) => {
      console.log("obj: ", obj);
      const result = await User.findOne({ where: { user_id: user_id } });

      return result;
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
