import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { VidService } from '../../vid.service';
import { Vid } from '../../vid.model';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

	id: String;
	vid: any = {};
	updateForm: FormGroup;

	// tslint:disable-next-line:max-line-length
	constructor(private vidService: VidService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
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

	updateVid(title, responsible, description, severity, status) {
		this.vidService.updateVid(this.id, title, responsible, description, severity, status).subscribe(() => {
			this.snackBar.open('Video updated successfully', 'OK', {
				duration: 3000
			});
		});
	}

}
