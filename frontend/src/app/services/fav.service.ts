import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vid } from '../models/vid.model';
import { AuthenticationService } from './authentication.service';
import axios from 'axios';

@Injectable({
	providedIn: 'root'
})
export class FavService {
	uri = 'http://localhost:4000';

	constructor(private auth: AuthenticationService) { }

	async saveFav(vid: Vid) {
		if (this.auth.isLoggedIn()) {
			console.log(this.auth.isLoggedIn())
			var token = this.auth.getToken();
			var result = await axios.post(`${this.uri}/user/favs/save`, { userId: this.auth.getUserDetails()._id, vid: vid });
			if (result.data === true)
				return true;
			else {
				return false;
			}
		}
	}

	async checkFav(vid: Vid) {
		if (this.auth.isLoggedIn()) {
			var token = this.auth.getToken();
			var result = await axios.post(`${this.uri}/user/favs/check`, { userId: this.auth.getUserDetails()._id, vid: vid });
			if (result.data === true)
				return true;
			else {
				return false;
			}
		}
	}

	async removeFav(vid: Vid) {
		if (this.auth.isLoggedIn()) {
			var token = this.auth.getToken();
			var result = await axios.post(`${this.uri}/user/favs/remove`, { userId: this.auth.getUserDetails()._id, vid: vid });
			if (result.data === true)
				return true;
			else {
				return false;
			}
		}
	}
}
