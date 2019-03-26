<template>
	<div>
		<player v-bind:player="player" v-bind:vid="vid"></player>
		<sidebar></sidebar>
	</div>
</template>

<script>
	module.exports = {
		data: function () {
			const vid = new Vid(
				'123',
				'a video title',
				'a video description',
				'pinkbike probably',
				'12-34-5678',
				'https://www.youtube.com/watch?v=Yb8XUhxZeb8'
			);

			const player = new YoutubePlayer(vid);

			return {
				vid: vid,
				player: player
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