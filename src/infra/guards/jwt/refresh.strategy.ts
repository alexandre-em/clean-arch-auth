import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserRepository } from 'src/application/user/ports/user.repository';
import { ITokenPayload } from 'src/domain/adaptaters/token.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET!,
    });
  }

  async validate(payload: ITokenPayload) {
    return this.userRepository.findById(payload.sub!);
  }
}
