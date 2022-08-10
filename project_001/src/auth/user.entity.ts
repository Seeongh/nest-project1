import { Board } from 'src/boards/board.entity';
import {Entity, Column, PrimaryGeneratedColumn, Unique} from 'typeorm'

@Entity()
@Unique(['username'])
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // @OnetoMany(type =>Board, board => board.user, {egar: true})
    // boards: Board[]
}