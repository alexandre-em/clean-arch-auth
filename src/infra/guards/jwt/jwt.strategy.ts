import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserRepository } from 'src/application/user/ports/user.repository';
import { ITokenPayload } from 'src/domain/adaptaters/token.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'SECRET',
    });
  }

  validate(payload: ITokenPayload) {
    return this.userRepository.findById(payload.sub!);
  }
}
