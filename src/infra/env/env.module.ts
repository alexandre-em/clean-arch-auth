import { Module } from '@nestjs/common';
import { EnvService } from './env.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      validate: (env) => envSchema.parse(env),
      isGlobal: false,
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
