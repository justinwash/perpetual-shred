import YouTubeService from '../services/youtube.service.js';

export default class YouTubePlayer {
	constructor (vid, onEnded) {
		this.vid = vid;
		this.onEnded = onEnded;
		this.service = new YouTubeService();
		this.create();
	}

	// type: 'youtube';
	// vid;
	// service;
	// controller;
	// onEnded;

	create() {
		this.service.createYouTubePlayer(this);
	}
}

