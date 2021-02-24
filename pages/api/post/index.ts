import client from "../client";
import { Post } from "../../../interfaces/module/post/post.interface";
import qs from "qs";

interface doneParam {
  id: number;
  status: string;
}

export const addPost = async (post: Post) =>
  await client.post("/api/post/post", { post });

export const getPosts = async (id: string) => {
  const queryString = qs.stringify({
    id,
  });

  return await client.get(`/api/post/posts?${queryString}`);
};

export const done = async ({ id, status }: doneParam) =>
  await client.put("/api/post/post", { id, status });

export const getStock = async () => await client.get("/stocks");
