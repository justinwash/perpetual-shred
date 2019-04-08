<template>
	<div class="account-page">
		<div class="logout-button" v-on:click="logout()">
			<button>Log Out</button>
		</div>
		<div class="back-button" v-on:click="$router.push('/')">
			<button>Back to Home</button>
		</div>
		<div class="account-info" v-if="user" v-for="(value, key) in user">
			<p>{{ key }}: {{ value }}</p>
		</div>
		<div v-if="vidLeft" class="account-info">
			Last video watched this session: {{ vidLeft._id }}: {{ vidLeft.title }}.
			<br>
			Time stopped: {{ vidLeftTime }}
		</div>
	</div>
</template>

<script>
	module.exports = {
		data: function () {
			return {
				user: PS._authenticationService.getUserDetails(),
				vidLeft: PS._store.get('vid') ? PS._store.get('vid') : null,
				vidLeftTime: PS._store.get('time')
			}
		},
		methods: {
			logout() {
				PS._authenticationService.logout();
				this.$router.push('/');
			}
		}
	}
</script>

<style scoped>
	.account-page {
		overflow: auto;
		height: 100vh;
	}

	.account-info {
		text-align: left;
		margin: 10px;
	}

	.logout-button {
		position: fixed;
		top: 10px;
		right: 24px;
	}

	.back-button {
		position: fixed;
		top: 34px;
		right: 24px;
	}
</style>