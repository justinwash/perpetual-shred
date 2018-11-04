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
	favorited: boolean;

	constructor(private favService: FavService) { }

	async ngOnInit() {
		this.originName = this.getOriginDisplayName(this.vid.origin);
		this.favorited = await this.isFavorited(this.vid);
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
		this.favorited = this.isFavorited(this.vid);
	}

	isFavorited(vid: Vid): any {
		return this.favService.checkFav(this.vid);
	}

	async removeFav() {
		await this.favService.removeFav(this.vid);
		this.favorited = await this.isFavorited(this.vid);
	}
}
