// import { useDispatch, useSelector } from "react-redux";
// import { loadingStart, loadingEnd } from "../modules/loading";
import Link from "next/link";

const LoadingBtn = () => {
  // const dispatch = useDispatch();

  // const onClick = () => {
  //   console.log("click");
  //   dispatch(loadingStart());
  // };
  // return <button onClick={onClick}>로딩</button>;
  return (
    <>
      <div>
        <Link href="/post">
          <a>포스트 페이지 이동</a>
        </Link>
      </div>
      <div>
        <Link href="/stock">
          <a>주식 페이지 이동</a>
        </Link>
      </div>
    </>
  );
};
export default LoadingBtn;
