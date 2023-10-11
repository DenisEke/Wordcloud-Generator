import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import {AnyFilesInterceptor, FileInterceptor} from "@nestjs/platform-express";
import {StorageService} from "../storage/storage.service";
import {UserService} from "../user/user.service";
import {MasksService} from "./masks.service";

@Controller('masks')
export class MasksController {

    private readonly logger = new Logger(MasksController.name);

    constructor(private readonly storageService: StorageService, private readonly userService: UserService, private readonly maskService: MasksService) {
    }

    /*
    TODO: validate masks
        not to huge
        right size?
        right bg?
        right aspect ratio?
     */

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async upload(@Body() body, @UploadedFile() file): Promise<string> {


        //TODO: resize every single incoming mask
        console.log(file, body);
        const url = await this.storageService.uploadUserMask(file, body.user);
        console.log(url);
        await this.userService.addMaskToUser(url, body.user);

        return "Added mask successfully";
    }

    @Post("/admin")
    @UseInterceptors(AnyFilesInterceptor())
    async adminMask(@Body() body, @UploadedFiles() files): Promise<string> {

        if (process.env.IS_APPENGINE) {
            return;
        }

        this.logger.log(files[0]);

        for (let i = 0; i < files.length; i++) {
            this.storageService.uploadAdminMask(files[i], body.category).then(url => this.maskService.addMaskToCollection(url, body.category));
        }

        return "Added mask successfully";
    }

    @Delete()
    async deleteUserMask(@Body() body) {
        this.userService.removeMaskFromUser(body.mask, body.user);
    }

    @Get("/:user")
    async getUserMasks(@Param("user") user: string): Promise<Array<Object>> {

        return await this.userService.getUserMasks(user);
    }

    @Post("/category")
    async createMaskCategory(@Body() body) {
        this.logger.log(body.name + " " + body.desc);
        this.maskService.createCategory(body.name, body.desc);
        return body.name + " " + body.desc;
    }
}
