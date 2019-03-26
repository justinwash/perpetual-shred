define(function () {
	function YoutubePlayer(vid) {
		this.type = 'youtube';
		this.vid = vid;
		this.controller = null;
		this.create = function () {
			PS._youtubeService.createYouTubePlayer(this);
		}();
	}

	return YoutubePlayer;
});

