import {Controller, Get, Logger} from '@nestjs/common';
import axios from "axios";

@Controller()
export class FontsController {
    private readonly logger = new Logger(FontsController.name);

    private fonts = [];

    constructor() {
        axios.get("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyB16BAJhBLF8Q8z6oikZ9rmnIiR61kaCSA&sort=popularity")
            .then((res) => {
                this.logger.log("Got " + res.data.items.length + " fonts from Google");
                res.data.items.length = 75;
                res.data.items.forEach((item) => this.fonts.push(item));
            })
            .catch((err) => this.logger.error("Couldn't get fonts from Google"));
    }


    @Get("/fonts")
    async getFonts(): Promise<Array<object>> {
        if (this.fonts.length < 1) {
            this.logger.error("Got a request for fonts but no fonts loaded.");
        }


        return this.fonts;
    }

}
