import { Test, TestingModule } from '@nestjs/testing';
import { JwtTokenService } from './jwt.service';
import { JWT_EXPIRATION } from '../../../core/constants';
import { JwtService } from '@nestjs/jwt';

describe('JwtService', () => {
  let service: JwtTokenService;
  let jwtService: JwtService;
  const secret = 'test-secret';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtTokenService, JwtService],
    }).compile();

    service = module.get<JwtTokenService>(JwtTokenService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should generate a token', () => {
    const data = {
      sub: 'test-id',
      name: 'test-name',
      email: 'test-email@email.mail',
      image: 'https://test-images.img/test.png',
      role: 1,
      aud: 'http://localhost:3000',
    };
    const token = service.generateToken(data, secret, JWT_EXPIRATION);

    expect(token).toBeDefined();

    const decoded = jwtService.verify(token, { secret });

    expect(decoded.exp).toBeGreaterThan(decoded.iat);

    delete decoded.exp;
    delete decoded.iat;

    expect(decoded).toEqual(data);
  });
});
