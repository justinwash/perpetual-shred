import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VidService } from '../../vid.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

	createForm: FormGroup;

	constructor(private vidService: VidService, private fb: FormBuilder, private router: Router) {
		this.createForm = this.fb.group({
			title: ['', Validators.required],
			description: '',
			origin: '',
			releaseDate: '',
			url: ''
		});
	}

	addVid(title, description, origin, releaseDate, url) {
		this.vidService.addVid(title, description, origin, releaseDate, url).subscribe(() => {
			this.router.navigate(['/list']);
		});
	}

	ngOnInit() {
	}

}
