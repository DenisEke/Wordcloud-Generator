import {Controller, Get, Logger, Query, Res} from "@nestjs/common";
import {DownloadService} from "./download.service";

@Controller('download')
export class DownloadController {
    private readonly logger = new Logger(DownloadController.name);

    constructor(private readonly downloadService: DownloadService) {
    }

    /*
    'Content-Type': 'application/docx',
    'Content-Disposition': 'attachment; filename='+data.invoiceNum.replace('/','-')+'_'+data.date+'_'+data.name+'.docx',
    "Content-Length": docx.length
     */

    @Get()
    async getFile(@Query('uid') uid, @Query('format') format, @Query('job') job, @Res() res) {

        const img = await this.downloadService.download(uid, format, job);

        res.write(img, 'binary');
        res.end(null, 'binary');


    }

}