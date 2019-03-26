export default class YouTubeService {
	createYouTubePlayer(player) {
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
				},
				events: {
					'onStateChange': function (event) {
						if (event.data === 0) {
							window.location.reload();
						}
					}
				},
			});
		};
	}

	initializeYoutubeApi() {
		const doc = window.document;
		const playerApiScript = doc.createElement('script');
		playerApiScript.type = 'text/javascript';
		playerApiScript.src = 'http://www.youtube.com/iframe_api';
		doc.body.appendChild(playerApiScript);
	}

	parseYouTubeId(url) {
		const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		const match = url.match(regExp);
		return (match && match[7].length === 11) ? match[7] : false;
	}
}
