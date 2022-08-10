import { User } from 'src/auth/user.entity';
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
import { BoardStatus } from './board-status.enum';

@Entity()
export class Board{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;

    // @ManytoOne(type => User, user => user.boards, {egar: false}))
    // user: User;

}