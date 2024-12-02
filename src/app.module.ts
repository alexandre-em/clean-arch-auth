import { Module } from '@nestjs/common';

import { ApplicationModule } from './application/application.module';
import { PersistenceModule } from './infrastructure/persistence/persistence.module';

@Module({
  imports: [
    ApplicationModule,
    PersistenceModule.register({
      type: 'mongoose',
      global: true,
    }),
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
