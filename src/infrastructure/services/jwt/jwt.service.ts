import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService, ITokenPayload } from 'src/domain/adaptaters/token.interface';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async verifyToken(token: string): Promise<any> {
    const decode = await this.jwtService.verifyAsync(token);
    return decode;
  }

  generateToken(payload: ITokenPayload, secret: string, expiresIn: string | number): string {
    return this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
  }
}
