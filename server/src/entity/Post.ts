import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import Comment from "./Comment";
import PostCategory from "./PostCategory";

@Entity()
export default class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text' })
    description: string;

    @ManyToOne(type => User, { eager: true })
    author: User;

    @OneToMany(t => Comment, t => t.post, { eager: false })
    comments: Comment[];

    @ManyToOne(t => PostCategory, { eager: true })
    category: PostCategory


}