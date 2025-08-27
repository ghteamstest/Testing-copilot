export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  id: string
  title: string
  content: string
  authorId: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  id: string
  content: string
  postId: string
  authorId: string
  createdAt: Date
  updatedAt: Date
}

// Database utility types
export type CreateUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateUser = Partial<CreateUser>

export type CreatePost = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>
export type UpdatePost = Partial<CreatePost>

export type CreateComment = Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateComment = Partial<CreateComment>