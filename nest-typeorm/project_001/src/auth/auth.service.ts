import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentailsDto } from './dto/auth-credential.dto';
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository,
        private jwtService : JwtService
    ){}

    async signUp(authCredentialsDto: AuthCredentailsDto) : Promise<void> {
       
       return await this.UserRepository.createUser(authCredentialsDto) ;
    }

    async signIn(authCredentialsDto: AuthCredentailsDto) : Promise<{ accessToken : string }> {
        const {username, password} = authCredentialsDto ;
        const user = await this.UserRepository.findOne({username}) ;

        if(user&& (await bcrypt.compare(password, user.password))){
            //여기서 유저 토큰 생성 (payload + secrit)
            const payload = {username}; //보통 user email, role 이런거 넣어줌, 중요정보 넣으면 안됨
            const accessToken = await this.jwtService.sign(payload) ; //알아서 payload+secrit 합쳐서 만듦   

            return { accessToken };
        }else{
            throw new UnauthorizedException('login failed');
        }
        
    }

}
