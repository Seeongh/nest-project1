import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

export class BoardStatusValidationPipe implements PipeTransform{

    readonly StatusOption=[
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value: any, metadata: ArgumentMetadata) {

        value = value.toUpperCase();

        if(!this.isStatusValue(value)) {
            throw new BadRequestException(`${value} isn't in to status option`);
        }

        console.log('value',value);
        console.log('matadata', metadata);
        
        return value ;
    }

    private isStatusValue(status:any){
        const index = this.StatusOption.indexOf(status);

        return index !== -1 ;
    }
}