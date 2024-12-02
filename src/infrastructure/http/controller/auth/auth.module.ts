import { Module } from '@nestjs/common';

import { SignInUseCase } from 'src/application/user/useCase/signIn';
import { PasswordCryptService } from 'src/domain/adaptaters/password-crypt.interface';
import { TokenService } from 'src/domain/adaptaters/token.interface';
import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/infrastructure/services/jwt/jwt.service';

import { AuthController } from './auth.controller';

@Module({
  providers: [
    {
      provide: PasswordCryptService,
      useClass: BcryptService,
    },
    {
      provide: TokenService,
      useClass: JwtTokenService,
    },
    SignInUseCase,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
