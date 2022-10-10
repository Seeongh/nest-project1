import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ){}

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`can't found board by ${id}`);
        }
        
        return found ;
    }

    createBoard(createBoardDto : CreateBoardDto , user: User) : Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async deleteBoard(id: number) : Promise<void> {
         const result = await this.boardRepository.delete(id); //remove는 id무조건 있어야함, delete는 있음 지움

         if(result.affected === 0 ){ //영향 받은게 0 개 
            throw new NotFoundException(`can't found board to delete by ${id}`);
         }
         console.log("delete",result);
    }

    async updateBoardStatus(id : number, status : BoardStatus) : Promise<Board> {
        const board = await this.getBoardById(id) ; 

        board.status = status ; 
        await this.boardRepository.save(board) ;

        return board ;
    }

    async getAllBoards(user: User) : Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', {userId:user.id});

        const boards = await query.getMany();
        //return await this.boardRepository.find(user) ; 
        return boards;
    }

    // private boards:Board[] = []; // 다른 component에서 사용 못함

    // getAllBoards():Board[] {
    //     return this.boards;
    // }

    // createBoard(createBoardDtd: CreateBoardDto){
    //     const {title, description} = createBoardDtd;

    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC,
    //     }
    //     this.boards.push(board);

    //     return board;
    // }

    // getBoardById(id: String): Board{
    //     const found = this.boards.find((board) => board.id === id);

    //     if(!found){
    //         throw new NotFoundException(`Can't find id with ${id}`);
    //     }
    //     else{
    //         return found;
    //     }
    // }

    // deleteBoard(id: string): void{
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board{
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
