import {IsNotEmpty, IsString} from "class-validator";

export class PlayerDto {
    @IsNotEmpty()
    @IsString()
    player: string;
}