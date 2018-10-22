import { google } from 'googleapis';
import 'babel-polyfill';

const _youtube = google.youtube({
	version: 'v3',
	auth: 'AIzaSyBV0CufWBbF7O1J6Y27kw5Tmmbcwj5t1Ho'
});

class YoutubeService {

	getYoutubeInfo(vid) {
		var yt = this;
		return new Promise(async function (resolve) {
			var res = await _youtube.videos.list({
				part: 'snippet',
				id: yt.parseYouTubeId(vid.url)
			});
			resolve(res.data.items[0].snippet);
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