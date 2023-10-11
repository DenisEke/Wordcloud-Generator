import {HttpException, HttpStatus, Injectable, Logger} from "@nestjs/common";
import * as firebase from "firebase-admin";
import {UserService} from "../user/user.service";

const fetch = require('node-fetch');
const svgToImg = require("svg-to-img");

@Injectable()
export class DownloadService {

    private readonly logger = new Logger(DownloadService.name);

    private readonly firestore;

    constructor(private readonly userService: UserService) {

        this.firestore = firebase.firestore();
    }

    async download(uid, format, jobId) {
        /*
        TODO: subscription service based downloads
         */

        if (!uid) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'This is a custom message',
            }, HttpStatus.UNAUTHORIZED);
        }

        if (format === "4k" || format === "SVG") {

            const downloadsLeft = await this.userService.getAvailableDownloadsFor(uid);

            if (downloadsLeft <= 0) {
                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: 'You dont have enough downloads left',
                }, HttpStatus.FORBIDDEN);
            }

            await this.firestore.collection("users").doc(uid).collection("payments")
                .add({
                    jobId: jobId,
                    amount: -1,
                    created: new Date(),
                    description: "Downloaded a cloud in " + format,
                })
        }

        this.logger.log((uid ? uid : "an unknown user") + " wants to download " + jobId + " in " + format);

        let job = await this.firestore.collection('generated').doc(jobId).get();

        const svg = await fetch(job.data().svg);
        const svgBuffer = await svg.buffer();

        return this.svgToFormat(format, svgBuffer);
    }

    async svgToFormat(format, svgBuffer) {

        let image;

        switch (format) {
            case "720p":
                image = await svgToImg.from(svgBuffer).toPng({
                    width: 720,
                    height: 720,
                });
                break;
            case "1080p":
                image = await svgToImg.from(svgBuffer).toPng({
                    width: 1080,
                    height: 1080,
                });
                break;
            case "4k":
                image = await svgToImg.from(svgBuffer).toPng({
                    width: 4000,
                    height: 4000,
                });
                break;
            case "SVG":
                image = svgBuffer;
                break;
        }

        return image;
    }
}