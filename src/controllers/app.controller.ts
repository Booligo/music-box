import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { PlayerDto, CategoryDto, RoundResponseDto } from "../dto";


@Controller('musicBox')
export class AppController {
  constructor(
      private readonly appService: AppService,
  ) {}

  @Post("/push")
  pushAnswer() {
  };
  @Post(':id/new_player')
  createPlayer(@Param('id') id: number, @Body() { player }: PlayerDto): Promise<boolean> {
    return this.appService.createPlayer(player, id);
  };
  @Post('/start')
  async startGame(@Body(){}): Promise<boolean>{
    return this.appService.startGame();
  };
  @Post(':id/new_round')
  startNewRound(@Param('id') id: number, @Body() { category }: CategoryDto){
    return this.appService.startNewRound(category, id);
  };
  @Post(':roundId/:gameId/end_round')
  async endRound(@Param('roundId') roundId: number, @Param('gameId') gameId: number, @Body() data: Array<RoundResponseDto>): Promise<void>{
    return  this.appService.distributePoints(roundId, data, gameId);
  };
  @Get('/score')
  showScore(@Query('id') id: number): Promise<Array<RoundResponseDto>>{
    return this.appService.gameScore(id);
  };
}
