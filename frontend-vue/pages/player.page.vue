<template>
	<div>
		<player v-bind:player="player" v-bind:vid="vid"></player>
		<sidebar></sidebar>
	</div>
</template>

<script>
	module.exports = {
		data: function () {
			// const vid = new Vid(
			// 	'123',
			// 	'a video title',
			// 	'a video description',
			// 	'pinkbike probably',
			// 	'12-34-5678',
			// 	'https://www.youtube.com/watch?v=Yb8XUhxZeb8'
			// );

			// const player = new YoutubePlayer(vid);

			return {
				vid: new Vid(),
				player: {}
			}
		},
		methods: {
			fetchVids() {
				return PS._vidService.getVids();
			},

			selectRandomVid() {
				const randomId = this.getRandomInt(0, this.vids.length);
				this.vid = this.vids[randomId];
			},

			getRandomInt(min, max) {
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min)) + min;
			}
		},
		mounted() {
			this.fetchVids().then(res => {
				this.vids = res.data;
				this.selectRandomVid();
				this.player = new YoutubePlayer(this.vid);
			});
		},
		components: {
			'player': httpVueLoader('../components/player/player.component.vue'),
			'sidebar': httpVueLoader('../components/player/sidebar.component.vue')
		}
	}
</script>

<style scoped>
	p {
		font-size: 2em;
		text-align: center;
	}
</style>