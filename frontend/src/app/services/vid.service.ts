import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vid } from '../models/vid.model';

@Injectable({
	providedIn: 'root'
})
export class VidService {
	uri = 'http://localhost:4000';

	constructor(private http: HttpClient) { }

	getVids() {
		return this.http.get(`${this.uri}/vids`);
	}

	getVidById(id) {
		return this.http.get(`${this.uri}/vids/${id}`);
	}

	addVid(title, description, origin, releaseDate, url) {
		const vid = {
			title: title,
			description: description,
			origin: origin,
			releaseDate: releaseDate,
			url: url
		};
		return this.http.post(`${this.uri}/vids/add`, vid);
	}

	updateVid(id: String, title: any, description: any, origin: any, releaseDate: any, url: any) {
		const vid = {
			title: title,
			description: description,
			origin: origin,
			releaseDate: releaseDate,
			url: url
		};
		return this.http.post(`${this.uri}/vids/update/${id}`, vid);
	}

	deleteVid(id) {
		return this.http.get(`${this.uri}/vids/delete/${id}`);
	}

	getPlayerType(url: string) {
		if (url.includes('youtube')) {
			return 'youtube';
		}
		if (url.includes('pinkbike')) {
			return 'pinkbike';
		}
		if (url.includes('vimeo')) {
			return 'vimeo';
		} else { return url; }
	}
}
