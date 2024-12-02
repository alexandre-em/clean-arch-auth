import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { VerifyCallback } from 'passport-google-oauth20';
import { UserRepository } from 'src/application/user/ports/user.repository';
import { User } from 'src/domain/entities';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userRepository: UserRepository) {
    super();
  }

  serializeUser(user: User, done: VerifyCallback) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: VerifyCallback) {
    const user = this.userRepository.findById(payload.id);
    return user ? done(null, user) : done(null, undefined);
  }
}
