import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JWT_EXPIRATION, JWT_REFRESH } from 'src/core/constants';
import { PasswordCryptService } from 'src/domain/adaptaters/password-crypt.interface';
import { ITokenPayload, TokenService, UserToTokenPayload } from 'src/domain/adaptaters/token.interface';

import { UserRepository } from '../ports/user.repository';

interface SignInUseCaseCommand {
  email: string;
  password: string;
}

@Injectable()
export class SignInUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService,
    private pcsService: PasswordCryptService,
  ) {}

  async execute(props: SignInUseCaseCommand): Promise<any> {
    const user = await this.userRepository.findByEmail(props.email);

    if (user instanceof Error) {
      return user;
    }

    const isPasswordValid = await this.pcsService.compare(props.password, user.password);

    if (!isPasswordValid) {
      return new UnauthorizedException();
    }

    const payload: ITokenPayload = UserToTokenPayload(user);

    return {
      accessToken: this.tokenService.generateToken(payload, process.env.JWT_SECRET!, JWT_EXPIRATION),
      refreshToken: this.tokenService.generateToken(payload, process.env.JWT_REFRESH_SECRET!, JWT_REFRESH),
    };
  }
}
