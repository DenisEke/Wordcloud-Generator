import {BadRequestException, HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {InjectStripe} from "nestjs-stripe";
import Stripe from "stripe";
import * as stripe from "stripe";
import {config} from "../config/config";
import * as firebase from "firebase-admin";

@Injectable()
export class PaymentsService {

    private readonly logger = new Logger(PaymentsService.name);
    private products;
    private firestore;

    constructor(@InjectStripe() private readonly stripe: Stripe) {
        this.stripe.products.list().then((result) => this.products = result.data);
        this.firestore=firebase.firestore();
    }

    getProducts() {
        this.logger.log("Someone requested the products");
        return this.products;
    }

    async purchasePack(uid, price, mail): Promise<string> {

        if (!price) {
            this.logger.error(uid + " " + mail + " tried to buy an unexisting price " + price);
            throw new BadRequestException("Tried to buy an invalid amount of tokens");
            return;
        }

        const sessionId: string = await this.getSession(price, uid, mail);
        this.logger.log("The request got assigned the following sessionId: " + sessionId);

        return sessionId;
    }

    async getSession(priceId, uid, mail): Promise<string> {

        const amount=config.PACKS.filter((pack)=>pack.price_id===priceId)[0].amount;

        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: mail,
            client_reference_id: uid,
            line_items: [{
                price: priceId,
                quantity: 1,
            }],
            mode: 'payment',
            success_url: config.FRONTEND + "user/payments?success="+amount,
            cancel_url: config.FRONTEND + "user/plans?canceled=true"
        });

        return session.id;
    }

    async stripeCallback(body,signature){
        let event;

        try {
            event = this.stripe.webhooks.constructEvent(body, signature, config.WEBHOOK_SECRET);
        } catch (err) {
            this.logger.warn("Webhook request failed");
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Something went wrong',
            }, HttpStatus.BAD_REQUEST);
        }

        this.logger.log("Received a "+event.type+" event from stripe");

        // Handle the checkout.session.completed event
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            const {data} = await this.stripe.checkout.sessions.listLineItems(session.id);

            const purchasedPack=config.PACKS.filter((pack)=>pack.price_id===data[0].price.id)[0];

            await this.firestore.collection("users").doc(session.client_reference_id).collection("payments")
                .add({
                    price:session.amount_total,
                    objectId:session.id,
                    amount:purchasedPack.amount,
                    created: new Date(),
                    description:"Purchased a "+purchasedPack.amount+" pack",
                })

            this.logger.log(session.client_reference_id+" "+session.customer_email+" purchased a pack with "+purchasedPack.amount+" premium downloads");
        }

        return;
    }

}
