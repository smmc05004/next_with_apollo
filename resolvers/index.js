const Member = require("../models").Member;

const resolvers = {
  Query: {
    ping: () => "pong",
    members: async () => {
      const result = await Member.findAll();
      return result;
    },
  },
};

export default resolvers;
