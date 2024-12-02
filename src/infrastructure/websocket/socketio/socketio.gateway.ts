import { WebSocketGateway, OnGatewayConnection, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { SocketIoService } from './socketio.service';

@WebSocketGateway()
export class SocketIoGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Socket;

  constructor(private readonly socketService: SocketIoService) {}

  handleConnection(socket: Socket): void {
    console.log(this.server);
    this.socketService.handleConnection(socket);
  }

  // Implement other Socket.IO event handlers and message handlers
}
