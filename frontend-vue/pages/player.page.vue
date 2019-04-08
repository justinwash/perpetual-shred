<template>
	<div>
		<navigation v-bind:player="player"></navigation>
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

			setVid(vid) {
				this.vid = vid;
				PS._store.set('vid', this.vid);

				this.player = new YoutubePlayer(vid);
				PS._store.set('player', this.player);
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
					this.setVid(res.data);
				});

			} else if (PS._store.get('vid')) {
				this.setVid(PS._store.get('vid'));

			} else {
				this.getRandomVid().then((res) => {
					if (res.data[0]) {
						this.setVid(res.data[0]);
					} else err => {
						console.log(err);
						this.mounted();
					}
				});
			}
		},
		components: {
			'player': httpVueLoader('../components/player/player.component.vue'),
			'sidebar': httpVueLoader('../components/player/sidebar.component.vue'),
			'navigation': httpVueLoader('../components/shared/main-nav.component.vue'),
		}
	}
</script>

<style scoped>
	p {
		font-size: 2em;
		text-align: center;
	}

	#player {
		position: absolute;
		min-height: 100vh;
		width: 178vh;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>