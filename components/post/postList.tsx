import { PostData, Posts } from "../../interfaces/module/post/post.interface";
import PostItem from "./postItem";
import styled from "styled-components";

const PostTitle = styled.h1`
  text-align: center;
  padding-bottom: 20px;
`;

const TodoTable = styled.table`
  width: 300px;
  text-align: center;
  margin: 0 auto;
  padding: 20px;
  line-height: 23px;
`;
const TodoThead = styled.thead`
  font-size: 15px;
  font-weight: 600;
`;
const TodoTbody = styled.tbody`
  font-size: 14px;
  font-weight: 300;
`;

interface PostListProps extends Posts {
  onComplete: (e: React.MouseEvent<HTMLButtonElement>, post: PostData) => void;
}

const PostList = ({ posts, onComplete }: PostListProps) => {
  const items = posts.map((post, index) => {
    return <PostItem post={post} key={index} onComplete={onComplete} />;
  });

  return (
    <section>
      <PostTitle>POST</PostTitle>

      <TodoTable>
        <colgroup>
          <col width={15} />
          <col width={50} />
          <col width={30} />
          <col width={5} />
        </colgroup>

        <TodoThead>
          <tr>
            <th>날짜</th>
            <th>할일</th>
            <th>완료여부</th>
            <th></th>
          </tr>
        </TodoThead>
        <TodoTbody>{items}</TodoTbody>
      </TodoTable>
    </section>
  );
};

export default PostList;
