import {
    MessageBody, SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
    @WebSocketServer()
    server: Server;
    @SubscribeMessage('push')
    pushAnswer(@MessageBody() player: string): void {
        this.server.emit('push', player);
    }
    @SubscribeMessage('new_round')
    createNewRound(@MessageBody() data:string): void {
        this.server.emit('new_round',data);
    }
    @SubscribeMessage('end_round')
    notifyEndRound(@MessageBody() data: number): void {
        this.server.emit('end_round',data);
    }
    @SubscribeMessage('create_player')
    showPlayer(@MessageBody() player: string): void {
        this.server.emit('create_player', player);
    }
}