import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../components";
import LoadingBtn from "../components/loadingBtn";
import { RootStateInterface } from "../interfaces/rootState";

const Home = () => {
  const loading: boolean = useSelector(
    (state: RootStateInterface) => state.loading.loading
  );
  console.log("loadingState: ", loading);

  return (
    <div>
      <div>Home 페이지</div>
      <LoadingBtn />
      {loading && <Loading />}
    </div>
  );
};

export default Home;
