import { Module } from '@nestjs/common';
import { SocketioModule } from './socketio/socketio.module';

@Module({
  imports: [SocketioModule]
})
export class WebsocketModule {}
