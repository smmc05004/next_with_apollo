import { GetServerSideProps } from "next";
import { END } from "redux-saga";
import { Loading } from "../components";
import { RootStateInterface } from "../interfaces/rootState";
import { loadingState } from "../interfaces/module/loading/loading.interface";
import { initializeApollo } from "../lib/apolloClient";
// import apolloClient from "../lib/apolloClient";
import { useQuery, gql } from "@apollo/client";

// const GET_MEMBERS = gql`
//   query {
//     users {
//       user_id
//       user_name
//     }
//   }
// `;

interface HomeVars extends loadingState {}

const Home = (props: any) => {
  console.log("props: ", props);

  return <div>메인 페이지</div>;
};

export async function getServerSideProps() {
  const res = "aaaa";
  const data = res;

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
}
export default Home;
