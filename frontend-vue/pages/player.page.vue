<template>
<div>
	<p>{{ greeting }}</p>
	<video-player></video-player>
	<sidebar></sidebar>
</div>
</template>

<script>
	module.exports = {
		data: function () {
			return {
				greeting: 'This is the player page'
			}
		},
		components: {
			'video-player': httpVueLoader('../components/player/video.component.vue'),
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