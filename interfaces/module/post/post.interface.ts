export interface Post {
  contents: string,
  deadline: string,
  complete: boolean,
  userId: string,
}

export interface postState {
  posts: Post[]
  post: Post | null
}

