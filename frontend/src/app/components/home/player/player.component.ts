import { Component, OnInit, Input } from '@angular/core';
import { Vid } from '../../../models/vid.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VidService } from '../../../services/vid.service';
import { YouTubeService } from '../../../services/youtube.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() vid: Vid;
  player: any;
  playerType: string;
  safeVidUrl: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer,
              private vidService: VidService,
              private ytService: YouTubeService) { }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.playerType = this.vidService.getPlayerType(this.vid.url);
    this.safeVidUrl = this.buildSafeVidUrl(this.vid.url);
    this.createYouTubePlayer(this.vid);
  }

  buildSafeVidUrl(url: string) {
    if(this.playerType === 'youtube')
      return this.sanitizer.bypassSecurityTrustResourceUrl(url + '?autoplay=1&enablejsapi=1');
  }

  createYouTubePlayer(vid: Vid){
    this.ytService.initializeYoutubeApi();
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.player = new (<any>window).YT.Player('player');
      console.log(this.player);
    }
  }
  stopVid() {
    this.player.stopVideo();
  }
}
