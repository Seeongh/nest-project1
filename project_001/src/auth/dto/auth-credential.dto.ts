import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentailsDto{

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    //영어 숫자 유효성 체크
    @Matches(/^[a-zA-Z0-9]*$/,{ message : 'not valid password'})
    password: string;
}