import { Post } from '../../interfaces/module/post/post.interface';

interface itemInterface {
  post: Post
}

const PostItem = ({ post }: itemInterface) => {
  return (
    <tr>
      <td>{post.content}</td>
      <td>{post.deadline}</td>
      <td>{post.iscomplete}</td>
    </tr>
  )
}

export default PostItem;