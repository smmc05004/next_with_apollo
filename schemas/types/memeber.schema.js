import { gql } from "apollo-server-express";

const memberSchema = gql`
  type member {
    firstName: String
    lastName: String
  }

  extend type Query {
    ping: String
    members: [member]
  }
`;

export default memberSchema;
