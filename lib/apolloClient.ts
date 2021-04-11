// // import { ApolloClient, InMemoryCache } from "@apollo/client";

// // const apolloClient = new ApolloClient({
// //   uri: "http://localhost:8080/graphql",
// //   cache: new InMemoryCache(),
// // });

// // export default apolloClient;

import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { gql } from "@apollo/client";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

// const getCookieValue = (key: string) => {
//   let cookieKey = key + "=";
//   let result = "";
//   const cookieArr = document.cookie.split(";");

//   for (let i = 0; i < cookieArr.length; i++) {
//     if (cookieArr[i][0] === " ") {
//       cookieArr[i] = cookieArr[i].substring(1);
//     }

//     if (cookieArr[i].indexOf(cookieKey) === 0) {
//       result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
//       return result;
//     }
//   }
//   return result;
// };
export const isLoggedInVar = makeVar<boolean>(false);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  cache,
  uri: "http://localhost:8080/graphql",
  headers: {
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTQ0Mjk3MjQsImRhdGEiOiIxMTA5NzQyMjkwMTIwMTE0MjIwNDEiLCJpYXQiOjE2MTgxNDE3MjR9.Ow8esCrzncsK1Ewl4-RFsrXgIbqgd9Xjql6BeVzV7CU" ||
      "",
  },
  typeDefs,
});
