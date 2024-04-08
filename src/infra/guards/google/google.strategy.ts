import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { SignInTiersUseCase } from 'src/application/user/use-case/sign-in-tiers';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly signInTiersUseCase: SignInTiersUseCase) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:8080/api/v1/auth/google/redirect`,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
    const { name, emails, photos } = profile;

    if (!emails) {
      return new UnauthorizedException('Google account not verified');
    }

    const user = {
      googleId: profile.id,
      email: emails![0].value,
      name: `${name?.givenName} ${name?.familyName}`,
      image: photos![0]?.value,
    };

    return this.signInTiersUseCase.execute(user);
  }
}
