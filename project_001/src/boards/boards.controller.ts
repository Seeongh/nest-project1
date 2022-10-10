import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './Pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {

    constructor(private boardService: BoardsService){}  //DI -암묵적으로 CLASS PROPERTY
   
    @Get('/:id')
    getBoardById(@Param('id') id : number) : Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto : CreateBoardDto,
    @GetUser() user:User) : Promise<Board>{
        return this.boardService.createBoard(createBoardDto, user) ;
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe)id : number ) : Promise<void> { //확실히 int다 아니면 error
        return this.boardService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id : number , 
        @Body('status', BoardStatusValidationPipe) status : BoardStatus
    ) : Promise<Board> {
        return this.boardService.updateBoardStatus(id,status) ;
    }

    @Get()
    getAllBoards(@GetUser() user:User) : Promise<Board[]>{
        return this.boardService.getAllBoards(user);
    }

    // @Get()
    // getAllBoard(): Board[]{
         
    //     return this.boardService.getAllBoards();
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() CreateBoardDto : CreateBoardDto
    // ): Board{
    //     return this.boardService.createBoard(CreateBoardDto);
    // }

    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board{
    //     return this.boardService.getBoardById(id);
    // }

    // @Delete('/:id')
    // deleteBoard(@Param('id')id :string): void{
    //     this.boardService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status : BoardStatus,
    // ): Board {
    //     return this.boardService.updateBoardStatus(id,status);
    // }
}
