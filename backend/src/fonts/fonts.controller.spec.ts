import {Test, TestingModule} from '@nestjs/testing';
import {FontsController} from './fonts.controller';

describe('Fonts Controller', () => {
    let controller: FontsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FontsController],
        }).compile();

        controller = module.get<FontsController>(FontsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
