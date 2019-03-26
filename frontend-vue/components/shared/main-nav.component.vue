<template>
	<div class="main-nav">
		<main-nav-button v-bind:parent="this"></main-nav-button>
		<div v-bind:class="'nav-overlay ' + (navOverlayActive ? 'active' : 'inactive')"></div>
		<div class="nav-button-group">
			<span v-bind:class="'nav-button ' + (navOverlayActive ? 'active' : 'inactive')">Discover Radness</span>
			<span v-bind:class="'nav-button ' + (navOverlayActive ? 'active' : 'inactive')">All Videos</span>
			<span
				v-bind:class="'nav-button ' + (navOverlayActive ? 'active' : 'inactive')"
			>About Perpetual Shred</span>
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

	.nav-button-group {
		position: fixed;
		color: white;
		font-family: serif;
		font-size: 2rem;
		display: flex;
		flex-direction: column;
		top: 1rem;
		left: 8rem;
		z-index: 10;
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

	.active {
		opacity: 0.8;
		transition: 0.2s;
	}

	.inactive {
		opacity: 0;
		transition: 0.2s;
	}
</style>