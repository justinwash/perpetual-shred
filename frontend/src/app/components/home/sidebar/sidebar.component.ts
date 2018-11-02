import { Component, OnInit, Input } from '@angular/core';
import { Vid } from 'src/app/models/vid.model';
import { FavService } from 'src/app/services/fav.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	@Input() vid: Vid;
	@Input() playerReference: any;
	originName: string;
	constructor(private favService: FavService) { }

	ngOnInit() {
		this.originName = this.getOriginDisplayName(this.vid.origin);
	}

	getOriginDisplayName(url: string) {
		if (url.includes('youtube'))
			return 'YouTube';
		if (url.includes('pinkbike'))
			return 'PinkBike';
		if (url.includes('vimeo'))
			return 'Vimeo';
		else return url;
	}

	pauseVid() {
		this.playerReference.controller.pauseVideo();
	}

	playVid() {
		this.playerReference.controller.playVideo();
	}

	saveFav() {
		this.favService.saveFav(this.vid);
	}
}
