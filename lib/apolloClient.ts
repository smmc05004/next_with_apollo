// // import { ApolloClient, InMemoryCache } from "@apollo/client";

// // const apolloClient = new ApolloClient({
// //   uri: "http://localhost:8080/graphql",
// //   cache: new InMemoryCache(),
// // });

// // export default apolloClient;

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";

const cache = new InMemoryCache();

export const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache,
});
