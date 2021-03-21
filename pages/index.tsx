import { GetServerSideProps } from "next";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import { Loading } from "../components";
import { RootStateInterface } from "../interfaces/rootState";
import wrapper from "../store";
// import { checkLogin } from "../modules/auth";
import authSlice from "../modules/auth";
import { loadingState } from "../interfaces/module/loading/loading.interface";
import { initializeApollo } from "../lib/apolloClient";
// import apolloClient from "../lib/apolloClient";
import { useQuery, gql } from "@apollo/client";

const GET_MEMBERS = gql`
  query {
    users {
      user_id
      user_name
    }
  }
`;

interface HomeVars extends loadingState {}

const Home = (props: any) => {
  console.log("props: ", props);
  // const { loading }: HomeVars = useSelector((state: RootStateInterface) => ({
  //   loading: state.loading.loading,
  // }));
  const { loading, error, data } = useQuery(GET_MEMBERS);
  console.log("data: ", data);

  return (
    <div>
      {data &&
        data.members &&
        data.members.map((member: any) => {
          return <div key={member.firstName}>{member.firstName}</div>;
        })}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (context: any) => {
    const { req } = context;

    if (req.cookies && req.cookies["my-cookie"]) {
      const token = req.cookies["my-cookie"];
      context.store.dispatch(authSlice.actions.CHECK_LOGIN({ token }));
    } else {
      console.log("로그인 필요");
    }

    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();

    const apolloClient = initializeApollo(null);

    await apolloClient.query({
      query: GET_MEMBERS,
    });

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  }
);

export default Home;
