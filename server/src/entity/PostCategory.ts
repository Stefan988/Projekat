import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({ name: 'post_category' })
export default class PostCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;
}