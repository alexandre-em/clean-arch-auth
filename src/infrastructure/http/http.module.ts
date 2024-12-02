import { Module } from '@nestjs/common';

import { SignInUseCase } from 'src/application/user/useCase/signIn';
import { SignInTiersUseCase } from 'src/application/user/useCase/signInTiers';
import { PasswordCryptService } from 'src/domain/adaptaters/password-crypt.interface';
import { TokenService } from 'src/domain/adaptaters/token.interface';

import { JwtStrategy } from '../guards/jwt/jwt.strategy';
import { LocalStrategy } from '../guards/local/local.strategy';
import { AuthModule } from './controller/auth/auth.module';
import { UserModule } from './controller/user/user.module';
import { SessionSerializer } from '../guards/google/google.serializer';
import { GoogleStrategy } from '../guards/google/google.strategy';
import { JwtRefreshStrategy } from '../guards/jwt/refresh.strategy';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtTokenModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';

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
