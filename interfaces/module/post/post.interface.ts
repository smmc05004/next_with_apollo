export interface Post {
  content: string,
  deadline: string,
  iscomplete: boolean,
  userId: string,
}

// export interface Posts {
//   posts: Post[]
// }

export interface postState {
  posts: Post[] | []
  post: Post | null
}

