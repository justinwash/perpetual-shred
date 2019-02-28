import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Vid } from '../../models/vid.model';
import { VidService } from '../../services/vid.service';
import { A11yModule } from '@angular/cdk/a11y';
import { YouTubePlayer } from 'src/app/models/youtube-player.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	@ViewChild('sidebar') sidebar: MatSidenav;
	vids: Vid[];
	currentVid: Vid;
	sidebarOpen = true;
	playerReference: YouTubePlayer;

	constructor(private vidService: VidService, private cd: ChangeDetectorRef) { }

	ngOnInit() {
		this.fetchVids();
	}

	closeSidebar() {
		this.sidebar.close();
		this.sidebarOpen = false;
	}

	openSidebar() {
		this.sidebar.open();
		this.sidebarOpen = true;
	}

	fetchVids() {
		this.vidService
			.getVids()
			.subscribe((data: Vid[]) => {
				this.vids = data;
				this.selectRandomVid();
			});
	}

	selectRandomVid() {
		const randomId = this.getRandomInt(0, this.vids.length);
		this.currentVid = this.vids[randomId];
		this.cd.detectChanges();
	}

	getRandomInt(min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	setPlayerReference(event: any) {
		this.playerReference = event;
		this.cd.detectChanges();
	}

}
