import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should AES encrypt a data', () => {
    const data = 'Sensitive data to encrypt';

    const encryptedData = service.encryptData(data);
    const decryptedData = service.decryptData(encryptedData);

    expect(encryptedData).toBeDefined();
    expect(encryptedData).not.toEqual(data);
    expect(data).toEqual(decryptedData);
  });
});
