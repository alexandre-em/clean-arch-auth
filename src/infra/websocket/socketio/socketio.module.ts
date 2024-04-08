import { Module } from '@nestjs/common';

import { SocketIoGateway } from './socketio.gateway';
import { SocketIoService } from './socketio.service';

@Module({
  providers: [SocketIoGateway, SocketIoService],
})
export class SocketioModule {}
