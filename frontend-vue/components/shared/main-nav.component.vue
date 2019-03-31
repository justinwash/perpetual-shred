<template>
	<div class="main-nav">
		<main-nav-button v-bind:parent="this"></main-nav-button>
		<div v-bind:class="'nav-overlay ' + (navOverlayActive ? 'active' : 'inactive')"></div>
		<div class="nav-button-group-center-wrapper">
			<div v-bind:class="'nav-button-group ' + (navOverlayActive ? 'active' : 'inactive')">
				<span class="nav-button">
					<img src="assets/icons/video-camera.svg">Discover Radness
				</span>
				<span class="nav-button">All Videos</span>
				<span class="nav-button">About Perpetual Shred</span>
			</div>
		</div>
		<div v-bind:class="'login-button ' + (navOverlayActive ? 'active' : 'inactive')">Log In</div>
	</div>
</template>

<script>
	module.exports = {
		data() {
			return {
				navOverlayActive: false
			}
		},
		methods: {
			toggleMainNavOverlay() {
				this.navOverlayActive = !this.navOverlayActive;
			}
		},
		components: {
			'main-nav-button': httpVueLoader('components/shared/main-nav-button.component.vue')
		}
	}
</script>

<style scoped>
	.nav-overlay {
		position: fixed;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: black;
		z-index: -10;
	}
	.nav-overlay.active {
		opacity: 0.8;
		transition: 0.2s;
	}
	.nav-overlay.inactive {
		opacity: 0;
		transition: 0.2s;
	}

	.nav-button-group-center-wrapper {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: calc(100vh - 35rem);
	}

	.nav-button-group {
		color: white;
		font-family: serif;
		font-size: 2rem;
		display: flex;
		flex-direction: column;
	}
	.nav-button-group.active {
		opacity: 1;
		transition: 0.2s;
	}
	.nav-button-group.inactive {
		opacity: 0;
		transition: 0.2s;
	}

	.nav-button {
		cursor: pointer;
	}

	.login-button {
		position: fixed;
		color: white;
		font-family: serif;
		font-size: 2rem;
		display: flex;
		flex-direction: column;
		top: 1rem;
		right: 2rem;
	}
	.login-button.active {
		opacity: 1;
		transition: 0.2s;
	}
	.login-button.inactive {
		opacity: 0;
		transition: 0.2s;
	}
</style>