import { Component, OnInit, Input } from '@angular/core';
import { Vid } from '../../../models/vid.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() vid: Vid;
  constructor() { }

  ngOnInit() {
  }

}
