import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtTokenService } from './jwt.service';
import { EnvModule, EnvService } from 'src/infra/env';
import { JWT_EXPIRATION } from 'src/core/constants';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [EnvModule],
      useFactory: (envService: EnvService) => ({
        secret: envService.get('JWT_SECRET'),
        global: true,
        signOptions: { expiresIn: JWT_EXPIRATION },
      }),
      inject: [EnvService],
      global: true,
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
