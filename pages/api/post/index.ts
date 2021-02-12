import client from "../client";
import { Post } from "../../../interfaces/module/post/post.interface";
import qs from "qs";

// interface apiParam {
//   post: Post
// }

export const addPost = async (post: Post) =>
  await client.post("/post", { post });

export const getPosts = async (id: string) => {
  const queryString = qs.stringify({
    id,
  });

  return await client.get(`/posts?${queryString}`);
};
