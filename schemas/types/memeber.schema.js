import { gql } from "apollo-server-express";

const memberSchema = gql`
  type member {
    firstName: String
    lastName: String
  }

  type Query {
    ping: String
    members: [member]
  }
`;

export default memberSchema;
