<template>
	<div
		v-bind:class="'nav-button ' + ( mainNavButtonActive ? 'active' : 'inactive' )"
		v-on:click="toggleMainNavButton(); parent.toggleMainNavOverlay();"
	>
		<img class="nav-button-inner" src="assets/images/nav-logo.svg">
	</div>
</template>

<script>
	module.exports = {
		props: ['parent'],
		data() {
			return {
				mainNavButtonActive: false
			}
		},
		methods: {
			toggleMainNavButton() {
				this.mainNavButtonActive = !this.mainNavButtonActive;
			}
		},
		components: {
			'main-nav-button': httpVueLoader('components/shared/navigation-button-main.component.vue')
		}
	}
</script>

<style scoped>
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