const Member = require("../../models").Member;

const memberResolver = {
  Query: {
    ping: () => "pong",
    members: async () => await getMembers(),
  },
};

const getMembers = () => {
  const result = Member.findAll();
  return result;
};

export default memberResolver;
