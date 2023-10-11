import {Module} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {DownloadController} from "./download.controller";
import {DownloadService} from "./download.service";
import {StorageService} from "../storage/storage.service";

@Module({
    providers: [DownloadService, UserService, StorageService],
    controllers: [DownloadController],
})
export class DownloadModule {
}