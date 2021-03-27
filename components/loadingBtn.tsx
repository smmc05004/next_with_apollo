import Link from "next/link";

const LoadingBtn = () => {
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
