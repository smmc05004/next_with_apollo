import { DbPost } from '../../interfaces/module/post/post.interface';

interface itemInterface {
  post: DbPost;
  onComplete: (e: React.MouseEvent<HTMLButtonElement>, post: DbPost) => void
}

const PostItem = ({ post, onComplete }: itemInterface) => {
  const isComplete = post.complete;

  return (
    <tr>
      <td>{post.deadline}</td>
      <td>{post.contents}</td>
      <td>{post.complete}</td>
      <td>
      <button onClick={(e) => onComplete(e, post)}>
        {
          isComplete === 'n' ? ' 완료' : '취소'
        }
      </button>
        </td>
    </tr>
  )
}

export default PostItem;