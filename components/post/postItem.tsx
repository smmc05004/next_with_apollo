import { Post } from '../../interfaces/module/post/post.interface';

interface itemInterface {
  post: Post
}

const PostItem = ({ post }: itemInterface) => {
  return (
    <tr>
      <td>{post.contents}</td>
      <td>{post.deadline}</td>
      <td>{post.complete}</td>
    </tr>
  )
}

export default PostItem;