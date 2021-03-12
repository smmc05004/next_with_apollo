const Member = require("../../models").Member;

const getMembers = () => {
  const result = Member.findAll();
  return result;
};

module.exports = {
  Query: {
    ping: () => "pong",
    members: async () => await getMembers(),
  },
};

// const memberResolver = {
//   Query: {
//     ping: () => "pong",
//     members: async () => await getMembers(),
//   },
// };

// export default memberResolver;
