import { Module } from '@nestjs/common';

import { EnvModule } from './env';
import { HttpModule } from './http/http.module';
import { ServicesModule } from './services/services.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [ServicesModule, HttpModule, EnvModule, WebsocketModule],
})
export class InfrastructureModule {}
