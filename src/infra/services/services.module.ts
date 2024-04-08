import { Module } from '@nestjs/common';

import { BcryptModule } from './bcrypt/bcrypt.module';
import { CryptoModule } from './crypto/crypto.module';
import { JwtTokenModule } from './jwt/jwt.module';

@Module({
  imports: [BcryptModule, JwtTokenModule, CryptoModule],
})
export class ServicesModule {}
