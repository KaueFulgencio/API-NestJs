import { IsNumberString } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'todos' })
export class Todo {
    @PrimaryColumn()
    id: number;

    @Column()
    title: string;
}
