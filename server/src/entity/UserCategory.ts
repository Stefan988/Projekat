import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
    name: 'user_category'
})
export default class UserCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;
}