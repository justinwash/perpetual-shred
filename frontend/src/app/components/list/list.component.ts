import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Vid } from '../../vid.model';
import { VidService } from '../../vid.service';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

	vids: Vid[];
	displayedColumns = ['title', 'description', 'origin', 'releaseDate', 'url', 'actions'];

	constructor(private vidService: VidService, private router: Router) { }

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

}
