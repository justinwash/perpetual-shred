import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  updateVid(id, title, description, origin, releaseDate, url) {
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
}
