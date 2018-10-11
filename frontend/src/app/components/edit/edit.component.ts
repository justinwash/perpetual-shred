import { Component, OnInit } from '@angular/core';
import { VidService } from '../../services/vid.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  vid: any = {};
  updateForm: FormGroup;

  constructor(private vidService: VidService, private router: Router, private route: ActivatedRoute,
    private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      description: '',
      origin: '',
      releaseDate: '',
      url: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.vidService.getVidById(this.id).subscribe(res => {
        this.vid = res;
        this.updateForm.get('title').setValue(this.vid.title);
        this.updateForm.get('description').setValue(this.vid.description);
        this.updateForm.get('origin').setValue(this.vid.origin);
        this.updateForm.get('releaseDate').setValue(this.vid.releaseDate);
        this.updateForm.get('url').setValue(this.vid.url);
      });
    });
  }

  updateVid(title, description, origin, releaseDate, url) {
    this.vidService.updateVid(this.id, title, description, origin, releaseDate, url).subscribe(() => {
      this.snackBar.open('Vid updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

}
