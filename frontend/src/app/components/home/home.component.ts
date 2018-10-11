import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Vid } from '../../models/vid.model';
import { VidService } from '../../services/vid.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('sidebar') sidebar: MatSidenav;
  vids: Vid[];
  currentVid: Vid;

  constructor(private vidService: VidService) { }

  ngOnInit() {
    this.fetchVids();
  }

  closeSidebar() {
    this.sidebar.close();
  }

  fetchVids() {
    this.vidService
      .getVids()
      .subscribe((data: Vid[]) => {
        this.vids = data;
        this.currentVid = data[0]; // Need a randomizer function
        console.log('Data requested ...');
        console.log(this.vids);
      });
  }

}
