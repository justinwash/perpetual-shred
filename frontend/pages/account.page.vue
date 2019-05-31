<template>
	<div class="account-page">
		<div class="favs-container">
			<div class="favs-header">My Shredness</div>
			<div v-bind:class="'nav-button'" v-on:click="$router.push('/')">
				<img class="nav-button-inner" src="assets/images/nav-logo.svg" />
			</div>
			<div class="favs-list">
				<div class="fav-box" v-for="fav in user.favs">
					<div
						class="fav-thumb"
						v-bind:style="
							'background-image: ' +
								'url(http://i3.ytimg.com/vi/' +
								_youtubeService.parseYouTubeId(fav.url) +
								'/hqdefault.jpg)'
						"
						v-on:click="$router.push('/vid/' + fav._id)"
					>
						<img class="fav-play-overlay" src="assets/icons/play.svg" />
					</div>
					<div class="fav-title" v-on:click="$router.push('/vid/' + fav._id)">
						{{ fav.title }}/
					</div>
					<div class="fav-description">{{ fav.description }}</div>
					<div class="fav-origin">
						<a :href="fav.origin">View original post</a>
					</div>
				</div>
			</div>
			<div v-if="vidLeft" class="account-info">
				Last video watched this session: {{ vidLeft._id }}: {{ vidLeft.title }}.
				<br />
				Time stopped: {{ vidLeftTime }}
			</div>
		</div>
		<div class="side-bar">
			<div class="account-username">{{ user.name }}</div>
			<div class="account-role" v-if="user.role === 0">Admin</div>
			<div class="account-email">{{ user.email }}</div>
			<div class="disclaimer">
				Please be patient as we build out the new Perpetual Shred. One day there
				will be togglable settings here
			</div>
			<div class="logout-button" v-on:click="logout()">
				Log Out
			</div>
		</div>
	</div>
</template>

<script>
	module.exports = {
		data: function() {
			return {
				user: PS._authenticationService.getUserDetails(),
				_youtubeService: PS._youtubeService,
				vidLeft: PS._store.get('vid') ? PS._store.get('vid') : null,
				vidLeftTime: PS._store.get('time')
			};
		},
		methods: {
			logout() {
				PS._authenticationService.logout();
				this.$router.push('/');
			}
		},
		mounted: function() {
			PS._authenticationService.profile().then((res) => {
				if (res) {
					this.user = res.data;
					console.log(this.user);
				}
			});
		}
	};
</script>

<style scoped>
	.account-page {
		overflow: hidden;
		height: 100vh;
		color: white;
		background-image: linear-gradient(
				to bottom,
				rgba(0, 0, 0, 0.7) 0%,
				rgba(0, 0, 0, 0.7) 100%
			),
			url('/assets/images/account-bg.jpg');
		background-position: right;
		display: flex;
		flex-direction: row;
	}

	.favs-header {
		height: 5.6rem;
		text-align: center;
		font-size: 2rem;
		margin-left: 4rem;
		padding-top: 2.5rem;
	}

	.favs-container {
		overflow-y: scroll;
		width: 100%;
	}

	.favs-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}

	.fav-box {
		display: flex;
		width: 28rem;
		height: 44rem;
		flex-direction: column;
		align-content: center;
		justify-content: flex-start;
	}

	.disclaimer {
		font-size: 1.2rem;
		margin-top: 3rem;
	}

	.side-bar {
		position: sticky;
		flex-shrink: 0;
		top: 0;
		right: 0;
		padding: 20px;
		padding-top: 16px;
		overflow-x: hidden;
		overflow-y: hidden;
		height: 100vh;
		width: 40vw;
		max-width: 400px;
		background-color: rgba(105, 33, 33, 0.7);
		color: white;
		text-shadow: 0 0 12px rgba(0, 0, 0, 0.75);
		font-size: 2rem;
	}

	.nav-button {
		position: absolute;
		left: 1rem;
		top: 1rem;
		width: 6rem;
		border-radius: 50%;
		opacity: 0.5;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
		transition: 0.2s;
		cursor: pointer;
	}

	.nav-button:hover {
		opacity: 1;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
		transition: 0.2s;
		cursor: pointer;
	}

	.account-info {
		text-align: left;
		margin: 10px;
	}

	.logout-button {
		position: fixed;
		bottom: 10px;
		right: 10px;
	}

	.back-button {
		position: fixed;
		bottom: 34px;
		right: 10px;
	}

	.favs-container {
		scrollbar-color: dark !important;
		scrollbar-width: thin;
		overflow-x: hidden;
	}

	.favs-container::-webkit-scrollbar {
		width: 0.5rem;
	}

	.favs-container::-webkit-scrollbar-track {
		border-radius: 10px;
	}

	.favs-container::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: #ffffff55;
	}

	.fav-thumb {
		height: 20rem;
		width: 100%;
		background-position: center;
		background-size: cover;
		cursor: pointer;
		display: flex;
		justify-content: center;
	}

	a {
		text-decoration: none;
		color: white;
	}

	.fav-title {
		font-size: 2rem;
		margin-bottom: 1rem;
		cursor: pointer;
	}

	.fav-description {
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}

	.fav-play-overlay {
		width: 4rem;
		opacity: 0.7;
	}

	.logout-button {
		cursor: pointer;
		font-size: 1.2rem;
	}
</style>