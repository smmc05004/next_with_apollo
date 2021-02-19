import { GetServerSideProps } from "next";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import { Loading } from "../components";
import LoadingBtn from "../components/loadingBtn";
import { RootStateInterface } from "../interfaces/rootState";
import wrapper from "../store";
import { checkLogin } from "../modules/auth";
import { loadingState } from '../interfaces/module/loading/loading.interface';

interface HomeVars extends loadingState {}

const Home = () => {
  const { loading }: HomeVars = useSelector((state: RootStateInterface) => ({
    loading: state.loading.loading,
  }));

  return (
    <div>
      <div>Home 페이지</div>
      <LoadingBtn />
      {loading && <Loading />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (context: any) => {
    const { req } = context;

    if (req.cookies) {
      // console.log("coockie: ", req.cookies["my-cookie"]);
      const token = req.cookies["my-cookie"];
      context.store.dispatch(checkLogin({ token }));
    } else {
      console.log("로그인 필요");
    }

    context.store.dispatch(END);
    await context.store.sagaTask?.toPromise();
  }
);

export default Home;
