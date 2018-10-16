import { Component, OnInit, Input } from '@angular/core';
import { Vid } from '../../../models/vid.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VidService } from '../../../services/vid.service';
import { YouTubePlayer } from '../../../models/youtube-player.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() vid: Vid;
  player: any;
  playerType: string;
  constructor(private sanitizer: DomSanitizer,
              private vidService: VidService) { }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.playerType = this.vidService.getPlayerType(this.vid.url);
    this.player = new YouTubePlayer(this.vid, this.sanitizer);
  }
}
