<template>
	<div class="side-bar">
		<div class="sidebar-actions">
			<div v-on:click="toggleFav()" class="sidebar-action-button">
				<img v-if="faved" src="assets/icons/faved.svg" />
				<img v-if="!faved" src="assets/icons/fav.svg" />
			</div>
			<div class="sidebar-action-button">
				<img src="assets/icons/share.svg" />
			</div>
		</div>
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
			<div class="sidebar-action-button">
				PLAY/PAUSE ICON
			</div>
		</div>
	</div>
</template>

<script>
	module.exports = {
		props: ['vid'],
		data: function() {
			return {
				faved: false
			};
		},
		methods: {
			isVidFaved() {
				PS._favService.checkFav(this.vid).then((res) => {
					this.faved = res.data;
				});
			},
			saveFav() {
				PS._favService.saveFav(this.vid).then((res) => {
					this.faved = res.data;
				});
			},
			removeFav() {
				PS._favService.removeFav(this.vid).then((res) => {
					this.faved = !res.data;
				});
			},
			toggleFav() {
				if (this.faved) {
					this.removeFav();
				} else {
					this.saveFav();
				}
			}
		},
		mounted() {
			this.isVidFaved();
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

	.sidebar-actions {
		display: flex;
		width: 100%;
		top: 1rem;
		color: white;
		margin-bottom: 1rem;
	}

	.sidebar-action-button {
		width: 2.2rem;
		margin-right: 1rem;
	}

	.sidebar-action-button:hover {
		cursor: pointer;
	}

	.sidebar-origin-link {
		color: white;
		text-decoration: none;
	}
</style>