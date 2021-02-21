export interface Post {
  contents: string;
  deadline: string;
  complete: string;
  userId: string;
}

export interface PostData extends Post {
  postId: number;
}

export interface Posts {
  posts: PostData[];
}

export interface postState extends Posts {
  post: Post | null;
}

export interface doneParam {
  id: number;
  status: string;
}
