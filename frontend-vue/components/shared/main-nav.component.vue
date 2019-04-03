<template>
	<div class="main-nav">
		<main-nav-button v-bind:parent="this"></main-nav-button>
		<div v-bind:class="'nav-overlay ' + (navOverlayActive ? 'active' : 'inactive')"></div>
		<div class="nav-button-group-center-wrapper">
			<div
				v-on:click="getNewVid()"
				v-bind:class="'nav-button-group ' + (navOverlayActive ? 'active' : 'inactive')"
			>
				<span class="nav-button">
					<img class="nav-button-icon" src="assets/icons/video-camera.svg">Discover Radness
				</span>
				<span class="nav-button">
					<img class="nav-button-icon" src="assets/icons/video-player.svg">All Videos
				</span>
				<span class="nav-button">
					<img class="nav-button-icon" src="assets/icons/users.svg">About Perpetual Shred
				</span>
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
			},
			getNewVid() {
				window.location.reload();
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
	}
	.nav-button-group {
		color: white;
		font-family: serif;
		font-size: 2rem;
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		white-space: nowrap;
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
	.nav-button-icon {
		height: 1.8rem;
		margin-right: 10px;
		transform: translateY(5px);
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