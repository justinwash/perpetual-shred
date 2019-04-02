<template>
	<div>
		<player v-bind:player="player" v-bind:vid="vid"></player>
		<sidebar></sidebar>
	</div>
</template>

<script>
	module.exports = {
		data: function () {
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