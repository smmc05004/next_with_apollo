import { GetServerSideProps } from "next";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import { Loading } from "../components";
import { RootStateInterface } from "../interfaces/rootState";
import wrapper from "../store";
// import { checkLogin } from "../modules/auth";
import authSlice from "../modules/auth";
import { loadingState } from "../interfaces/module/loading/loading.interface";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("/imgs/main.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`;

interface HomeVars extends loadingState {}

const Home = () => {
  const { loading }: HomeVars = useSelector((state: RootStateInterface) => ({
    loading: state.loading.loading,
  }));

  return (
    <Wrapper>
      <Background />
      {loading && <Loading />}
    </Wrapper>
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
  }
);

export default Home;
