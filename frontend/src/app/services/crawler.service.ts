import { Injectable } from '@angular/core';
import { Vid } from '../models/vid.model';
import { HttpClient } from '@angular/common/http';

import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CrawlerService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  crawl() {
    return this.http.get(`${this.uri}/crawl`);
  }
}
