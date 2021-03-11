import { gql, makeExecutableSchema } from "apollo-server-express";
import memberResolver from "./resolvers/member.resolver";
import memberSchema from "./types/memeber.schema";

const RootSchema = gql`
  type Query {
    root: String
  }
`;

const RootResolver = {
  Query: {
    root: () => "running!",
  },
};

const schema = makeExecutableSchema({
  typeDefs: [RootSchema, memberSchema],
  resolvers: [RootResolver, memberResolver],
});

export default schema;
