import { Test, TestingModule } from '@nestjs/testing';
import { VimeoService } from './vimeo.service';

describe('VimeoService', () => {
  let service: VimeoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VimeoService],
    }).compile();

    service = module.get<VimeoService>(VimeoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
