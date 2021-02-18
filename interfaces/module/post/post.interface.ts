export interface Post {
  contents: string,
  deadline: string,
  complete: string,
  userId: string,
}

export interface PostData extends Post {
  postId: number
}
// export interface DbPost {
//   post_id: number
//   contents: string
//   deadline: string
//   complete: string
//   user_id: string
// }

export interface postState {
  posts: PostData[]
  post: Post | null
}

export interface doneParam {
  id: number
  status: string
}

