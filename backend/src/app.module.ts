import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {FontsController} from './fonts/fonts.controller';
import {MasksModule} from './masks/masks.module';
import {StorageService} from './storage/storage.service';
import {StorageModule} from './storage/storage.module';
import {RawBodyMiddleware} from "./middlewares/raw-body.middleware";
import {JsonBodyMiddleware} from "./middlewares/json-body.middleware";
import {UserModule} from './user/user.module';
import {PreviewModule} from './preview/preview.module';
import {DownloadModule} from "./download/download.module";
import {PaymentsModule} from './payments/payments.module';
import {StripeModule} from "nestjs-stripe";
import {config} from "./config/config";

@Module({
    imports: [
        StripeModule.forRoot({
            apiKey: config.STRIPE_KEY,
            apiVersion: '2020-03-02',
        }),
        MasksModule,
        MasksModule,
        DownloadModule,
        StorageModule,
        UserModule,
        PreviewModule,
        PaymentsModule,
    ],
    controllers: [AppController, FontsController],
    providers: [StorageService],
})
export class AppModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(RawBodyMiddleware)
            .forRoutes({
                path: '/payments/webhook',
                method: RequestMethod.POST,
            })
            .apply(JsonBodyMiddleware)
            .forRoutes('*');
    }
}
