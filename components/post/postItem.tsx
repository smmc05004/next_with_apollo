import { PostData } from "../../interfaces/module/post/post.interface";
import styled from "styled-components";

const TodoTr = styled.tr`
  &:nth-child(2n) {
    background-color: lightgray;
  }
`;

interface PostItemProps {
  post: PostData;
  onComplete: (e: React.MouseEvent<HTMLButtonElement>, post: PostData) => void;
}

const PostItem = ({ post, onComplete }: PostItemProps) => {
  const isComplete = post.complete;

  return (
    <TodoTr>
      <td>{post.deadline}</td>
      <td>{post.contents}</td>
      <td>{post.complete}</td>
      <td>
        <button onClick={(e) => onComplete(e, post)}>
          {isComplete === "n" ? " 완료" : "취소"}
        </button>
      </td>
    </TodoTr>
  );
};

export default PostItem;
