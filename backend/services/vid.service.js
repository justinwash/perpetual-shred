import axios from 'axios';
import apiUrl from '../environment.js';

import Vid from '../models/Vid';

const uri = apiUrl;

class VidService {

	getVids() {
		return axios.get(`${uri}/vids`);
	}

	getVidById(id) {
		return axios.get(`${uri}/vids/${id}`);
	}

	addVid(vid) {
		axios.post(`${uri}/vids/add`, vid);
	}

	addVids(vids) {
		for (const vid of vids) {
			if ((vid.description !== undefined) && (vid.description !== undefined)) {
				Vid.replaceOne(
					{ _id: vid._id },
					vid,
					{ upsert: true }
				).then(res => {
					console.log('added or updated vid: ', vid.title)
				}).catch(err => {
					console.log(err);
				});
			}
		}
	}

	updateVid(vid) {
		axios.post(`${uri}/vids/update/${id}`, vid);
	}

	deleteVid(id) {
		axios.get(`${uri}/vids/delete/${id}`);
	}
}

export default VidService;