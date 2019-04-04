<template>
	<div class="login-page">
		<div class="back-button" v-on:click="$router.push('/')">
			<button>Back to Home</button>
		</div>
		<div class="form">
			<p>login</p>Email:
			<input v-model="loginPayload.email" label="Email">
			Password:
			<input type="password" v-model="loginPayload.password" label="Password">
			<br>
			<button v-on:click="login">LOGIN PLEASE DO IT EVERYONES WAITING</button>
			<span v-if="loginStatus == true">You did it!</span>
			<span v-if="loginStatus == false">Wow you suck at logging in!</span>
		</div>

		<div class="form">
			<p>register</p>Username:
			<input v-model="registerPayload.name" label="Username">
			Email:
			<input v-model="registerPayload.email" label="Email">
			Password:
			<input type="password" v-model="registerPayload.password" label="Password">
			<br>
			<button v-on:click="register">REGISTER PLEASE I'M SO LONELY</button>
			<span v-if="registerStatus == true">Thank you so much!</span>
			<span v-if="registerStatus == false">Wow you suck at registering!</span>
		</div>
	</div>
</template>

<script>
	module.exports = {
		data: function () {
			return {
				loginPayload: {
					email: '',
					password: ''
				},
				registerPayload: {
					name: '',
					email: '',
					password: ''
				},
				loginStatus: null,
				registerStatus: null
			}
		},
		methods: {
			login() {
				PS._authenticationService.login(this.loginPayload).then(res => {
					if (res.status === 200) {
						this.loginStatus = true;
						this.$router.push('/')
					} else {
						this.loginStatus = false;
					}
				});
			},
			register() {
				PS._authenticationService.register(this.registerPayload).then(res => {
					if (res.status === 200) {
						this.registerStatus = true;
					} else {
						this.registerStatus = false;
					}
				});
			}
		}
	}
</script>

<style scoped>
	div {
		text-align: center;
	}

	.login-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100vh;
		background: #000;
		color: white;
		position: fixed;
		top: 0;
	}

	p {
		font-size: 2em;
		text-align: center;
	}

	.form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>