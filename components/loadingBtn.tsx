// import { useDispatch, useSelector } from "react-redux";
// import { loadingStart, loadingEnd } from "../modules/loading";
import Link from 'next/link';

const LoadingBtn = () => {
  // const dispatch = useDispatch();

  // const onClick = () => {
  //   console.log("click");
  //   dispatch(loadingStart());
  // };
  // return <button onClick={onClick}>로딩</button>;
  return <Link href="/todo"><a>포스트 페이지 이동</a></Link>;
};
export default LoadingBtn;
