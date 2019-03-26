<template>
	<div class="nav-overlay">
		<main-nav-button parent="this"></main-nav-button>
	</div>
</template>

<script>
	module.exports = {
		data() {
			return {
				mainNavButtonActive: false,
				this: this
			}
		},
		methods: {
			toggleMainNavOverlay() {
				console.log('main nav toggle');
			}
		},
		components: {
			'main-nav-button': httpVueLoader('components/shared/main-nav-button.component.vue')
		}
	}
</script>

<style scoped>
	p {
		font-size: 2em;
		text-align: center;
	}

	.nav-overlay {
		width: 100vw;
		height: 100vh;
	}

	.nav-button {
		width: 6rem;
		margin: 1rem;
		border-radius: 50%;
	}
	.nav-button.inactive {
		opacity: 0.5;
		transition: 0.2s;
	}
	.nav-button.active {
		opacity: 1;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
		transition: 0.2s;
	}
	.nav-button:hover {
		opacity: 1;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
		transition: 0.2s;
		cursor: pointer;
	}
	.nav-button:active {
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
		transition: 0.1s;
	}
</style>