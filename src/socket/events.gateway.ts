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

    sendEvent(@MessageBody() data: string) {
        this.server.emit('click',data);
        return data;
    }
    @SubscribeMessage('new_round')
    createNewRound(@MessageBody() data:string) {
        this.server.emit('new_round',data);
        return data;
    }
    @SubscribeMessage('end_round')
    endRound(@MessageBody() data:string) {
        this.server.emit('end_round',data);
        return data;
    }
}