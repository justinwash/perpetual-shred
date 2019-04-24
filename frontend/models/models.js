window.Vid = class Vid {
  constructor (id, title, description, origin, releaseDate, url) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.origin = origin;
    this.releaseDate = releaseDate;
    this.url = url;
  }
}

window.YoutubePlayer = class YouTubePlayer {
  constructor (vid) {
    this.type = 'youtube';
    this.vid = vid;
    this.create();
  }

  create() {
    PS._youtubeService.createYouTubePlayer(this);
  }
}
