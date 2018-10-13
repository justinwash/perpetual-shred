import { Component, OnInit, Input } from '@angular/core';
import { Vid } from '../../../models/vid.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() vid: Vid;
  playerType: string;
  safeVidUrl: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.playerType = this.detectPlayerType();
    this.safeVidUrl = this.buildSafeVidUrl(this.vid.url);
  }

  detectPlayerType(): string {
    return 'youtube';
  }

  buildSafeVidUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + '?autoplay=1');
  }
}
