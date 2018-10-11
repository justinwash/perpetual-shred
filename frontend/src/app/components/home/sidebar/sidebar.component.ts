import { Component, OnInit, Input } from '@angular/core';
import { Vid } from 'src/app/models/vid.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() vid: Vid;
  constructor() { }

  ngOnInit() {
  }

}
