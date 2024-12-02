import { Module } from '@nestjs/common';

import { CreateUserUseCase } from 'src/application/user/useCase/createUser';
import { GetUserByIdUseCase } from 'src/application/user/useCase/getUserById';
import { PasswordCryptService } from 'src/domain/adaptaters/password-crypt.interface';
import { TokenService } from 'src/domain/adaptaters/token.interface';
import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/infrastructure/services/jwt/jwt.service';

import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: PasswordCryptService,
      useClass: BcryptService,
    },
    {
      provide: TokenService,
      useClass: JwtTokenService,
    },
    CreateUserUseCase,
    GetUserByIdUseCase,
  ],
})
export class UserModule {}
