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
				player: {
					type: 'youtube'
				}
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
		color: white;
	}
</style>