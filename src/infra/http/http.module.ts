import { Module } from '@nestjs/common';

import { TokenService } from 'src/domain/adaptaters/token.interface';
import { PasswordCryptService } from 'src/domain/adaptaters/password-crypt.interface';
import { SignInUseCase } from 'src/application/user/use-case/sign-in';

import { LocalStrategy } from '../guards/local/local.strategy';
import { JwtStrategy } from '../guards/jwt/jwt.strategy';
import { UserModule } from './controller/user/user.module';
import { AuthModule } from './controller/auth/auth.module';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { JwtTokenModule } from '../services/jwt/jwt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { GoogleStrategy } from '../guards/google/google.strategy';
import { SessionSerializer } from '../guards/google/google.serializer';
import { SignInTiersUseCase } from 'src/application/user/use-case/sign-in-tiers';
import { JwtRefreshStrategy } from '../guards/jwt/refresh.strategy';

@Module({
  imports: [BcryptModule, JwtTokenModule, UserModule, AuthModule],
  providers: [
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    GoogleStrategy,
    SessionSerializer,
    {
      provide: PasswordCryptService,
      useClass: BcryptService,
    },
    {
      provide: TokenService,
      useClass: JwtTokenService,
    },
    SignInUseCase,
    SignInTiersUseCase,
  ],
  exports: [],
})
export class HttpModule {}
