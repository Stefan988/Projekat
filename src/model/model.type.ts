export interface User {
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    username: string,
    category: 'user' | 'admin'
}
export interface PostCategory {
    id: number,
    value: string,
}
export interface Post {
    id: number,
    title: string,
    description: string,
    author: User,
    category: PostCategory,
    comments: Comment[]
}
export interface Comment {
    id: number,
    content: string,
    user: User,
    post: Post
}
export interface UnregisteredUser {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    age: number
}
