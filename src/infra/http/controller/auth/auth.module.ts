import { Module } from '@nestjs/common';
import { PasswordCryptService } from 'src/domain/adaptaters/password-crypt.interface';
import { TokenService } from 'src/domain/adaptaters/token.interface';
import { BcryptService } from 'src/infra/services/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/infra/services/jwt/jwt.service';
import { AuthController } from './auth.controller';
import { SignInUseCase } from 'src/application/user/use-case/sign-in';

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
