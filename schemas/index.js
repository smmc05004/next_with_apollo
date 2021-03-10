import { gql } from 'apollo-server-express';

const schema = gql`
    type Query {
        ping: String
        members: [member]
    }

    type member {
        firstName: String,
        lastName: String
    }
`;

export default schema;