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

			getRandomVid() {
				return PS._vidService.getRandomVid();
			},

			getVids() {
				return PS._vidService.getVids();
			},
		},
		mounted() {
			if (this.params.id) {
				this.getVid(this.params.id).then(res => {
					this.vid = res.data;
					console.log(this.vid);
					this.player = new YoutubePlayer(this.vid);
				});
			} else {
				this.getRandomVid().then((res) => {
					if (res.data[0]) {
						this.vid = res.data[0];
						console.log(this.vid);
						this.player = new YoutubePlayer(this.vid);
					} else err => {
						console.log(err);
						window.location.reload();
					}
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