import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { throws } from "assert";
import { EntityRepository, Repository } from "typeorm"
import { AuthCredentailsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcryptjs";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(authCredentialsDto: AuthCredentailsDto) : Promise<void> {
        const {username, password} = authCredentialsDto ;

        const salt = await bcrypt.genSalt(); //db에 들어가는 데이터 처리하는거라 여기서 해줌
        const hashpassword = await bcrypt.hash(password,salt); //plaintext, salt값

        const user = this.create({
            username,
            password: hashpassword
        });

        try{
            await this.save(user);
        }catch(error){
            if(error.code === 'ER_DUP_ENTRY'){  //db단에서 중복 체크하려고 여기서 함
                throw new ConflictException('there are already ID');
            }else{
                throw new InternalServerErrorException();
            }
        }
      
      return ;
    }
}