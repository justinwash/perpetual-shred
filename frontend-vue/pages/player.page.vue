<template>
	<div>
		<player v-bind:player="player" v-bind:vid="vid"></player>
		<sidebar></sidebar>
	</div>
</template>

<script>
	module.exports = {
		data: function () {
			console.log(this.$route.params)
			return {
				params: this.$route.params,
				vids: [],
				vid: null,
				player: null
			}
		},
		methods: {
			getVid(id) {
				return PS._vidService.getVidById(id);
			},

			getVids() {
				return PS._vidService.getVids();
			},

			selectRandomVid() {
				const randomId = this.getRandomInt(0, this.vids.length);
				return this.vids[randomId];
			},

			getRandomInt(min, max) {
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min)) + min;
			}
		},
		mounted() {
			if (this.params.id) {
				this.getVid(this.params.id).then(res => {
					this.vid = res.data;
					this.player = new YoutubePlayer(this.vid);
				});
			} else {
				this.getVids().then(res => {
					this.vids = res.data;
					this.vid = this.selectRandomVid();
					this.player = new YoutubePlayer(this.vid);
				});
			}
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