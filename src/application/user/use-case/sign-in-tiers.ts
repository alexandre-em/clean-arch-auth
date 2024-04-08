import { Injectable } from '@nestjs/common';
import { webcrypto } from 'crypto';

import { TokenService, ITokenPayload, UserToTokenPayload } from 'src/domain/adaptaters/token.interface';
import { User } from 'src/domain/entities';
import { JWT_EXPIRATION, JWT_REFRESH, USER_PASSWORD_MIN_LENGTH } from 'src/core/constants';

import { UserRepository } from '../ports/user.repository';

interface SignInTiersUseCaseCommand {
  email: string;
  googleId: string;
  name: string;
  image?: string;
}

@Injectable()
export class SignInTiersUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService,
  ) {}

  async execute(props: SignInTiersUseCaseCommand): Promise<any> {
    let user = await this.userRepository.findByEmail(props.email);

    if (user instanceof Error) {
      // Generating a random password
      const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const randomPassword = webcrypto
        .getRandomValues(new Uint32Array(chars.length))
        .filter((_, i) => i < USER_PASSWORD_MIN_LENGTH)
        .reduce((prev, curr) => prev + chars[curr % chars.length], '');

      user = (await this.userRepository.create(
        new User({
          email: props.email,
          password: randomPassword,
          name: props.name,
          image: props.image,
          googleId: props.googleId,
          createdAt: new Date(),
        }),
      )) as User;
    }

    if (!user.googleId) {
      user = await this.userRepository.update(user.id, { googleId: props.googleId });
    }

    const payload: ITokenPayload = UserToTokenPayload(user);

    return {
      accessToken: this.tokenService.generateToken(payload, process.env.JWT_SECRET!, JWT_EXPIRATION),
      refreshToken: this.tokenService.generateToken(payload, process.env.JWT_REFRESH_SECRET!, JWT_REFRESH),
    };
  }
}
