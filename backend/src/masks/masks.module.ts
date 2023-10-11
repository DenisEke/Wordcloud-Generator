import {Module} from '@nestjs/common';
import {MasksController} from "./masks.controller";
import {StorageService} from "../storage/storage.service";
import {UserService} from "../user/user.service";
import {MasksService} from "./masks.service";

@Module({
    imports: [],
    controllers: [MasksController],
    providers: [StorageService, UserService, MasksService],
})
export class MasksModule {
}
