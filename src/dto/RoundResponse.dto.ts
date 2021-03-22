import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class RoundResponseDto {
    @IsNotEmpty()
    @IsString()
    player: string;
    @IsNotEmpty()
    @IsNumber()
    point: number;
}
