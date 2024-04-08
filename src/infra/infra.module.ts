import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { ServicesModule } from './services/services.module';
import { EnvModule } from './env';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [ServicesModule, HttpModule, EnvModule, WebsocketModule],
})
export class InfraModule {}
