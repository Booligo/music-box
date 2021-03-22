import { EntityManager } from "typeorm";
import { getManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { RoundResponseDto } from "../dto";

@Injectable()
export class DbStorage {
    private readonly manager: EntityManager;
    constructor() {
        this.manager = getManager();
    }
    startGame(): Promise<boolean> {
        return this.manager.query('INSERT game VALUES ();');
    };
    createPlayer(player: string, id: number): Promise<boolean> {
        return this.manager.query(`INSERT player (nickname, gameId) VALUES (?,?);`, [player, id])
    };
    startNewRound( category: string, gameId: number): Promise<boolean> {
        return this.manager.query(`INSERT round (gameId, category) VALUES (?,?);`, [gameId, category])
    };
    endRound(player: string, roundId: number,  point: number, gameId: number): Promise<boolean> {
        return this.manager.query(`INSERT score (player, roundId, point, gameId) VALUES (?,?,?,?);`, [player, roundId, point, gameId]);
    }
    gameScore(gameId): Promise<Array<RoundResponseDto>>{
        return this.manager.query(`SELECT player, SUM(point) as points FROM score WHERE gameId=? GROUP BY player;`,[gameId]);
    };
}