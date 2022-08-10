import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports : [
    PassportModule.register({defaultStrategy : 'jwt'}),
    JwtModule.register({
      secret : 'Secret1234',
      signOptions:{
        expiresIn: 3600 //60*60 1hour
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], //auth 모듈에서 사용
  exports: [JwtStrategy, PassportModule] //다른 모듈에서 사용
})
export class AuthModule {}
