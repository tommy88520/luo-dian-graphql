import { Test, TestingModule } from '@nestjs/testing';
import { SelectResolver } from './select.resolver';
import { SelectService } from './select.service';

describe('SelectResolver', () => {
  let resolver: SelectResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectResolver, SelectService],
    }).compile();

    resolver = module.get<SelectResolver>(SelectResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
