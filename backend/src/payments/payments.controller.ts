import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Logger,
    Param,
    Post,
    Req, Res
} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {PaymentsService} from "./payments.service";
import {config} from "../config/config";

@Controller('payments')
export class PaymentsController {

    private readonly logger = new Logger(PaymentsController.name);

    constructor(private readonly paymentService: PaymentsService,) {
    }

    @Get("packs")
    getProducts(){

        return config.PACKS;
    }

    @Post('pack')
    async purchasePack(@Body() body): Promise<string>{

        const {uid, price, mail} = body;
        this.logger.log("Got a request from " + uid +" "+mail+ " to buy " + price);

        return this.paymentService.purchasePack(uid,price,mail);
    }

    @Post("webhook")
    async stripeCallback(@Req() request, @Res() res){

        this.logger.log("Got a webhook request from Stripe");
        const sig = request.headers['stripe-signature'];

        await this.paymentService.stripeCallback(request.body,sig);

        res.json({received: true});
    }


}
