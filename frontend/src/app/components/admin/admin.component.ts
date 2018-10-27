import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { AuthenticationService } from '../../services/authentication.service';

import { Vid } from '../../models/vid.model';
import { VidService } from '../../services/vid.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	vids: Vid[];
	displayedColumns = ['title', 'description', 'origin', 'releaseDate', 'url', 'actions'];

	constructor(private vidService: VidService, private auth: AuthenticationService, private router: Router) { }

	ngOnInit() {
		this.fetchVids();
	}

	fetchVids() {
		this.vidService
			.getVids()
			.subscribe((data: Vid[]) => {
				this.vids = data;
				console.log('Data requested ...');
				console.log(this.vids);
			});
	}

	editVid(id) {
		this.router.navigate([`/edit/${id}`]);
	}

	deleteVid(id) {
		this.vidService.deleteVid(id).subscribe(() => {
			this.fetchVids();
		});
	}

	logout() {
		this.auth.logout();
	}

	goHome() {
		this.router.navigateByUrl('/');
	}

}
