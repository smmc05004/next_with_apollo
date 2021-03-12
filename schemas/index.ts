// import { gql, makeExecutableSchema } from "apollo-server-express";
import { makeExecutableSchema } from "apollo-server-express";
// import memberResolver from "./resolvers/member.resolver";
// import memberSchema from "./types/memeber.schema";
import allTypes from "./types";
import allResolvers from "./resolvers";
import { mergeTypeDefs, mergeResolvers } from "graphql-tools";

// import { mergeTypes } from "merge-graphql-schemas";

// const RootSchema = gql`
//   type Query {
//     root: String
//   }
// `;

// const RootResolver = {
//   Query: {
//     root: () => "running!",
//   },
// };

const schema = makeExecutableSchema({
  // typeDefs: [RootSchema, memberSchema],
  // resolvers: [RootResolver, memberResolver],
  typeDefs: [mergeTypeDefs(allTypes)],
  resolvers: [mergeResolvers(allResolvers)],
});

export default schema;
