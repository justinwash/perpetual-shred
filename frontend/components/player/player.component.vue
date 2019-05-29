<template>
	<div v-if="player" class="player">
		<div class="video-background">
			<div class="video-foreground">
				<div id="player" class="youtube-player"></div>
			</div>
		</div>
	</div>
</template>

<script>
	module.exports = {
		props: ['player', 'vid'],
		mounted() {
			this.$nextTick(() => {
				console.log('tisk tick'); // => 'not updated'
			});
		}
	};
</script>

<style scoped>
	* {
		box-sizing: border-box;
	}

	* {
		box-sizing: border-box;
	}
	.video-background {
		background: #000;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	.video-foreground,
	.video-background iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	@media (min-aspect-ratio: 16/9) {
		.video-foreground {
			height: 300% !important;
			top: -100% !important;
		}
	}
	@media (max-aspect-ratio: 16/9) {
		.video-foreground {
			width: 300% !important;
			left: -100% !important;
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