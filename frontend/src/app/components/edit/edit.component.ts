import { Component, OnInit } from '@angular/core';
import { VidService } from '../../services/vid.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  constructor(private vidService: VidService, private router: Router) { }

  ngOnInit() {
  }

}
