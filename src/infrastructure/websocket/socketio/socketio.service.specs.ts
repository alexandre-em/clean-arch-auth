import { Test, TestingModule } from '@nestjs/testing';
import { SocketIoService } from './socketio.service';

describe('SocketioService', () => {
  let service: SocketIoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketIoService],
    }).compile();

    service = module.get<SocketIoService>(SocketIoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
