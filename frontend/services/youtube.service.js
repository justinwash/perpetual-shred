export default class YouTubeService {
	createYouTubePlayer(player) {
		var startTime = null;

		window.YT = null;
		this.initializeYoutubeApi();
		window.onYouTubeIframeAPIReady = () => {
			player.controller = new window.YT.Player('player', {
				videoId: this.parseYouTubeId(player.vid.url),
				height: '100%',
				width: '100%',
				playerVars: {
					autoplay: 1,
					loop: 0,
					controls: 0,
					showinfo: 0,
					autohide: 1,
					modestbranding: 1,
					iv_load_policy: 3,
					mute: 1
				},
				events: {
					'onStateChange': function (event) {
						if (event.data === 0) {
							window.location.reload();
						}
						if (event.data === 1) {
							if (PS._store.time) {
								startTime = PS._store.get('time');
								PS._store.time = null;
								PS._store.player.controller.seekTo(startTime);
							}
						}
					},
					'onReady': function (event) {
						PS._store.player.controller.playVideo()
					}
				},
			});
		};
	}

	initializeYoutubeApi() {
		const existingApi = document.getElementById('youtube-api');
		if (existingApi) existingApi.remove();

		const doc = window.document;
		const playerApiScript = doc.createElement('script');
		playerApiScript.type = 'text/javascript';
		playerApiScript.id = 'youtube-api';
		playerApiScript.src = 'https://www.youtube.com/iframe_api';
		doc.body.appendChild(playerApiScript);
	}

	parseYouTubeId(url) {
		const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		const match = url.match(regExp);
		return (match && match[7].length === 11) ? match[7] : false;
	}
}
