import {Test, TestingModule} from '@nestjs/testing';
import {MasksController} from './masks.controller';

describe('Masks Controller', () => {
  let controller: MasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasksController],
    }).compile();

    controller = module.get<MasksController>(MasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
