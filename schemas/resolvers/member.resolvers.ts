const Member = require("../../models").Member;

module.exports = {
  Query: {
    ping: () => "pong",
    members: async () => await getMembers(),
  },
};

const getMembers = () => {
  const result = Member.findAll();
  return result;
};
export {};
