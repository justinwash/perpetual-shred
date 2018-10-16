import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { YouTubeService } from "../services/youtube.service";
import { Vid } from "./vid.model";

export class YouTubePlayer {
    constructor(private _vid: Vid, private _domSanitizer: DomSanitizer) {
        this.create();
    }
    type: string = 'youtube';
    vid: Vid = this._vid;
    sanitizer: DomSanitizer = this._domSanitizer;
    service: YouTubeService = new YouTubeService();
    controller: any;
    onEnded: Function;
    safeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.vid.url);
    create: Function = (player: YouTubePlayer) => {
        this.service.createYouTubePlayer(this);
    };
}

