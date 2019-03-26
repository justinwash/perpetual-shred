<template>
	<div>
		<p>{{ greeting }}</p>
		<player v-bind:player="player"></player>
		<sidebar></sidebar>
	</div>
</template>

<script>
	module.exports = {
		data: function () {
			return {
				greeting: 'This is the player page',
				vid: {
					id: '123',
					title: 'a video title',
					description: 'a video description',
					origin: 'pinkbike probably',
					releaseDate: '12-34-5678',
					url: 'https://www.youtube.com/watch?v=Yb8XUhxZeb8'
				},
				player: {}
			}
		},
		mounted() {
			this.player = type('models/youtube-player.model.js', this.vid)
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
		color: white;
	}
</style>