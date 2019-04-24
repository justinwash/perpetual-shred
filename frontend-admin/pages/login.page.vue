<template>
	<div>
		<p>{{ greeting }}</p>
		<br>
		<input v-model="payload.email" label="Email">
		<input v-model="payload.password" label="Password">
		<button v-on:click="login">LOGIN PLEASE DO IT EVERYONES WAITING</button>
	</div>
</template>

<script>
	module.exports = {
		data: function () {
			return {
				greeting: 'This is the login page',
				payload: {
					email: '',
					password: ''
				}
			}
		},
		methods: {
			login() {
				this._adminService.login(this.payload);
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
</style>