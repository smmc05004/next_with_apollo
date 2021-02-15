export interface Post {
  contents: string,
  deadline: string,
  complete: string,
  userId: string,
}

export interface DbPost {
  post_id: number
  contents: string
  deadline: string
  complete: string
  user_id: string
}

export interface postState {
  posts: DbPost[]
  post: Post | null
}

export interface doneParam {
  id: number
  status: string
}

