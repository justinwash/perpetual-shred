<template>
	<div>
		<div v-bind:class="'side-bar ' + (open ? 'open' : 'closed')">
			<action-bar v-if="vid" v-bind:vid="vid"></action-bar>
			<div class="sidebar-title">
				{{ vid.title }}
			</div>
			<div v-if="vid.description != ''" class="sidebar-description-container">
				<div class="sidebar-description-header">
					DESCRIPTION
				</div>
				<div class="sidebar-description">
					{{ vid.description }}
				</div>
			</div>
			<div class="sidebar-origin-container">
				<div class="sidebar-origin">
					<a class="sidebar-origin-link" :href="vid.origin" target="_blank">
						ICON Origin (fix me pls)
					</a>
				</div>
				<div class="sidebar-releaseDate">ICON {{ vid.releaseDate }}</div>
			</div>
			<div class="player-actions">
				<diV>
					PLAY/PAUSE ICON
				</diV>
			</div>
		</div>
		<div v-on:click="toggleSidebar()" class="sidebar-toggle-button">
			<img v-if="open" src="assets/icons/close.svg" />
			<img v-if="!open" src="assets/icons/open.svg" />
		</div>
	</div>
</template>

<script>
	module.exports = {
		props: ['vid'],
		data: function() {
			return {
				faved: false,
				open:
					PS._store.get('sidebarOpen') != undefined
						? PS._store.get('sidebarOpen')
						: true
			};
		},
		components: {
			'action-bar': httpVueLoader('components/shared/action-bar.component.vue')
		},
		methods: {
			toggleSidebar() {
				this.open = !this.open;
				PS._store.set('sidebarOpen', this.open);
			}
		}
	};
</script>

<style scoped>
	.side-bar {
		position: fixed;
		top: 0;
		right: 0;
		padding: 20px;
		padding-top: 16px;
		overflow-x: hidden;
		height: 100vh;
		width: 40vw;
		max-width: 400px;
		background-color: rgba(105, 33, 33, 0.7);
		color: white;
		text-shadow: 0 0 12px rgba(0, 0, 0, 0.75);
	}

	.side-bar.open {
		transform: unset;
		transition: 0.33s cubic-bezier(0.4, 0.34, 0, 0.96);
	}

	.side-bar.closed {
		transform: translateX(100%);
		transition: 0.33s cubic-bezier(0.4, 0.34, 0, 0.96);
	}

	.sidebar-toggle-button {
		position: fixed;
		top: 1rem;
		right: 1rem;
		color: white;
		margin-bottom: 1rem;
		width: 2.2rem;
		cursor: pointer;
	}

	.sidebar-content {
		padding: 20px;
		padding-top: 16px;
		overflow-x: hidden;
	}

	.sidebar-title {
		font-family: serif;
		font-size: 42px;
		letter-spacing: -0.3px;
		line-height: 0.9;
		margin-bottom: 20px;
	}

	.sidebar-description-header {
		font-size: 12px;
		font-weight: bold;
		font-family: sans-serif;
		letter-spacing: 6px;
		margin-bottom: 6px;
	}

	.sidebar-description {
		font-size: 18px;
		margin-bottom: 20px;
	}

	.sidebar-origin {
		text-align: left;
		font-size: medium;
	}

	.sidebar-origin-link {
		color: white;
		text-decoration: none;
	}

	.side-bar::-webkit-scrollbar {
		width: 0.5rem;
	}

	.side-bar::-webkit-scrollbar-track {
		border-radius: 10px;
	}

	.side-bar::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: #ffffff55;
	}
</style>