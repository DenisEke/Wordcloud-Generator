import {Body, Controller, Logger, Post} from '@nestjs/common';
import {PreviewService} from "./preview.service";
import Preview from "./preview.dto";

@Controller('preview')
export class PreviewController {

    private readonly logger = new Logger(PreviewController.name);

    constructor(private readonly previewService: PreviewService) {
    }

    @Post()
    async createPreview(@Body() body: Preview): Promise<string> {
        this.logger.log("Got a request for a preview from " + (body.uid ? body.uid : "an unregistered user"));

        const id = await this.previewService.createPreview(body);

        return id;
    }

}
