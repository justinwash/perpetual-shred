<template>
	<div>
		<div class="form">
			<p>login</p>Email:
			<input v-model="loginPayload.email" label="Email">
			Password:
			<input v-model="loginPayload.password" label="Password">
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
			<input v-model="registerPayload.password" label="Password">
			<br>
			<button v-on:click="login">REGISTER PLEASE I'M SO LONELY</button>
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
				const wtf = PS._authenticationService.login(this.loginPayload).subscribe(res => {
					console.log(res)
					if (res) {
						this.loginStatus = res.status;
						console.log(this.loginStatus);
					}
				})
				console.log(wtf)
			},
			register() {
				PS._authenticationService.register(this.payload);
			}
		}
	}
</script>

<style scoped>
	div {
		text-align: center;
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