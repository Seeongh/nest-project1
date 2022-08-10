import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentailsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/signup')
    singUp(@Body(ValidationPipe) authCredentialDto : AuthCredentailsDto) :Promise<void> {
        return this.authService.signUp(authCredentialDto) ;
    }

    @Post('/signin')
    singIn(@Body(ValidationPipe) authCredentialDto : AuthCredentailsDto) :Promise<{ accessToken : string}> {
        return this.authService.signIn(authCredentialDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user : User){
        console.log('user',user);
    }
}
