import { Module } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/user/use-case/create-user';
import { GetUserByIdUseCase } from 'src/application/user/use-case/get-user-by-id';
import { PasswordCryptService } from 'src/domain/adaptaters/password-crypt.interface';
import { TokenService } from 'src/domain/adaptaters/token.interface';
import { BcryptService } from 'src/infra/services/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/infra/services/jwt/jwt.service';

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
