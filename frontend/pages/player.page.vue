<template>
	<div>
		<player v-if="vid" v-bind:player="player" v-bind:vid="vid"></player>
		<sidebar v-if="vid" v-bind:vid="vid"></sidebar>
		<navigation v-bind:player="player"></navigation>
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
		};
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
		}
	},
	mounted() {
		if (this.params.id) {
			this.getVid(this.params.id).then((res) => {
				this.setVid(res.data);
			});
		} else if (PS._store.get('vid')) {
			this.setVid(PS._store.get('vid'));
		} else {
			this.getRandomVid().then(res => {
				console.log('page getRandomVid: ', res)
				if (res.data[0]) {
					this.setVid(res.data[0]);
				}
			}).catch(err => {
				console.log(err);
				this.mounted();
			});
		}
	},
	components: {
		player: httpVueLoader('../components/player/player.component.vue'),
		sidebar: httpVueLoader('../components/player/sidebar.component.vue'),
		navigation: httpVueLoader('../components/shared/main-nav.component.vue')
	}
};
</script>

<style scoped>
p {
	font-size: 2em;
	text-align: center;
}

* {
	box-sizing: border-box;
}
</style>