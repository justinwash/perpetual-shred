<template>
	<div v-if="player" class="player">
		<div class="player-outer">
			<div class="player-inner">
				<div v-if="player.type === 'youtube'" id="player" class="youtube-player"></div>
				<div v-if="player.type === 'vimeo'" id="player" class="vimeo-player"></div>
				<div v-if="player.type === 'pinkbike'" id="player" class="pinkbike-player"></div>
			</div>
		</div>
	</div>
</template>

<script>
	module.exports = {
		props: ['player', 'vid']
	}
</script>

<style scoped>
	* {
		box-sizing: border-box;
	}

	.player {
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	.player-outer {
		background: #000;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -99;
	}

	.player-inner,
	.player-outer iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	@media (min-aspect-ratio: 16/9) {
		.player-inner {
			height: 300%;
			top: -100%;
		}
	}
	@media (max-aspect-ratio: 16/9) {
		.player-inner {
			width: 300%;
			left: -100%;
		}
	}
	@media all and (max-width: 600px) {
		.vid-info {
			width: 50%;
			padding: 0.5rem;
		}
		.vid-info h1 {
			margin-bottom: 0.2rem;
		}
	}
	@media all and (max-width: 500px) {
		.vid-info .acronym {
			display: none;
		}
	}
</style>