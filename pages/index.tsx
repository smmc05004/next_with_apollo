import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../components";
import LoadingBtn from "../components/loadingBtn";
import { RootStateInterface } from "../interfaces/rootState";

interface HomeVars {
  loading: boolean;
}

const Home = () => {
  const { loading }: HomeVars = useSelector((state: RootStateInterface) => ({
    loading: state.loading.loading,
  }));

  // console.log("loading: ", loading);

  return (
    <div>
      <div>Home 페이지</div>
      <LoadingBtn />
      {loading && <Loading />}
    </div>
  );
};

export default Home;
