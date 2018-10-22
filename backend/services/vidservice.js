import axios from 'axios'

const uri = 'http://localhost:4000';

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
			console.log(vid);
			axios.post(`${uri}/vids/add`, vid);
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