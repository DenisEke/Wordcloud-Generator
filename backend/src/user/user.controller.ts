import {Controller, Get, Param} from '@nestjs/common';
import {UserService} from "./user.service";

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @Get("promo/:uid")
    async getPromotion(@Param("uid") uid: string) {

        await this.userService.addPromotion(uid);

        return "Your promotion was added.";
    }

}
