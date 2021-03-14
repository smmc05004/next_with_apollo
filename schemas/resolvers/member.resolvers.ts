const Member = require("../../models").member;

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
