import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vid } from '../../../models/vid.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VidService } from '../../../services/vid.service';
import { YouTubePlayer } from '../../../models/youtube-player.model';

@Component({
	selector: 'app-player',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
	constructor(private sanitizer: DomSanitizer,
		private vidService: VidService) { }

	@Input() vid: Vid;

	@Output('playerReference') playerReference = new EventEmitter();
	@Output('vidEnded') vidEnded = new EventEmitter();

	player: any;
	playerType: string;

	ngOnInit() {
		this.playerType = this.vidService.getPlayerType(this.vid.url);
		this.player = new YouTubePlayer(this.vid, this.sanitizer, this.onEnded);
		this.playerReference.emit(this.player);
	}

	onEnded() {
		this.vidEnded.emit();
	}
}
