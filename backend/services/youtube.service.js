import { google } from 'googleapis';
import 'babel-polyfill';
import { googleApiKey } from '../config/login';

const _youtube = google.youtube({
	version: 'v3',
	auth: googleApiKey
});

class YoutubeService {

	getYoutubeInfo(vid) {
		var yt = this;
		return new Promise(async function (resolve) {
			var res = await _youtube.videos.list({
				part: 'snippet',
				id: yt.parseYouTubeId(vid.url)
			});
			if (res.data.items.length > 0)
				resolve(res.data.items[0].snippet);
			else resolve(null);
		});
	}

	getYoutubeDescription(vid) {
		var yt = this;
		return new Promise(async function (resolve) {
			var res = await _youtube.videos.list({
				part: 'snippet',
				id: yt.parseYouTubeId(vid.url)
			});
			resolve(res.data.items[0].snippet.description);
		});
	}

	getYoutubeTitle(vid) {
		var yt = this;
		return new Promise(async function (resolve) {
			var res = await _youtube.videos.list({
				part: 'snippet',
				id: yt.parseYouTubeId(vid.url)
			});
			resolve(res.data.items[0].snippet.title);
		});
	}

	parseYouTubeId(url) {
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		var match = url.match(regExp);
		return (match && match[7].length == 11) ? match[7] : false;
	}
}

export default YoutubeService;