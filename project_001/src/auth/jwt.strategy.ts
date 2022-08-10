import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt , Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository
    ){
        super({
            secretOrKey: 'Secret1234',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() 
        });
    }

    async validate(payload) {   //유효한지 확인이 되면 payload가 전달됨
        const {username} = payload;
        const user: User = await this.userRepository.findOne(username) ;

        if(!user){
            throw new UnauthorizedException();
        }
        else{
            return user;
        }

    }
}