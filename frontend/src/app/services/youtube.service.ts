import { Injectable } from '@angular/core';
import { PlayerComponent } from '../components/home/player/player.component';
import { Vid } from '../models/vid.model';
import { YouTubePlayer } from '../models/youtube-player.model';

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

  createYouTubePlayer(player: YouTubePlayer){
    this.initializeYoutubeApi();
    (<any>window).onYouTubeIframeAPIReady = () => {
        player.controller = new (<any>window).YT.Player('player', {
            videoId: this.parseYouTubeId(player.vid.url),
            height: '100%',
            width: '100%',
            playerVars: {
                autoplay: 1,
                loop: 0,
                controls: 1,
                showinfo: 0,
                autohide: 1,
                modestbranding: 1,
                vq: 'hd1080',
                iv_load_policy: 3,
            },
            events: {
                'onStateChange': function (event) {
                    if(event.data === 0) window.location.reload();
              }
            },
        });
      console.log(player);
    }
  }

  parseYouTubeId(url: string){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  }
}