import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from './bcrypt.service';

describe('BcryptService', () => {
  let service: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    service = module.get<BcryptService>(BcryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash a string', async () => {
    const password = 'testPassword';
    const hashedPassword = await service.hash(password);

    expect(hashedPassword).toBeDefined();
    expect(hashedPassword).not.toEqual(password);
    expect(hashedPassword.includes(password)).toBeFalsy();
  });

  it('should be able to compare the hashed string with a string', async () => {
    const password = 'testPassword';
    const hashedPassword = await service.hash(password);

    expect(hashedPassword).toBeDefined();
    expect(service.compare(password, hashedPassword)).toBeTruthy();
  });
});
