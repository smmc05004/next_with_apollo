import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingEnd } from "../modules/loading";

const LoadingBtn = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    console.log("click");
    dispatch(loadingStart());
  };
  return <button onClick={onClick}>로딩</button>;
};
export default LoadingBtn;
