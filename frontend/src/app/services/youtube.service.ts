import { Injectable } from '@angular/core';
import { PlayerComponent } from '../components/home/player/player.component';
import { Vid } from '../models/vid.model';

@Injectable({
    providedIn: 'root'
  })
export class YouTubeService {

  initializeYoutubeApi() {
    const doc = (<any>window).document;
    let playerApiScript = doc.createElement('script');
    playerApiScript.type = 'text/javascript';
    playerApiScript.src = 'http://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApiScript);
  }
}