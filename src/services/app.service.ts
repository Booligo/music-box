import {  Injectable, ConflictException } from '@nestjs/common';
import { DbStorage } from "../storages";
import { RoundResponseDto } from "../dto";

@Injectable()
export class AppService {
  constructor(
      private dbStorage:DbStorage,
  ) {}
  async startGame(): Promise<boolean> {
    try {
      return this.dbStorage.startGame();
    }
    catch (error) {
      throw new ConflictException();
    }
  };
   createPlayer(player: string, id: number): Promise<boolean> {
    try {
      return this.dbStorage.createPlayer(player, id);
    }
    catch (error) {
      throw new ConflictException();
    }
  }
  async gameScore(gameId: number): Promise<Array<RoundResponseDto>>{
    const score = await this.dbStorage.gameScore(gameId);
    if(!score){
      throw new ConflictException();
    }
    return score;
  };

  endRound(player: string, roundId: number, point: number, gameId: number): Promise<boolean>{
    try{
      return this.dbStorage.endRound(player, roundId, point, gameId);
    }
    catch (error) {
      throw new ConflictException();
    }
  }
  async distributePoints(roundId: number, data: Array<RoundResponseDto>, gameId: number): Promise<void>{
    for (let i = 0; i < data.length; i++) {
      const { player, point } = data[i];
      await this.endRound(player, roundId, point, gameId);
    }
  };
  async startNewRound( category: string, gameId: number): Promise<boolean>{
    try {
      return this.dbStorage.startNewRound(category, gameId);
    }
    catch (error) {
      throw new ConflictException();
    }
  };
}
