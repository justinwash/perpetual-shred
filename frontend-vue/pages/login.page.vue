<template>
	<div>
		<p>{{ greeting }}</p>
		<br>
		<button v-on:click="login">LOGIN PLEASE DO IT EVERYONES WAITING</button>
	</div>
</template>

<script>
	module.exports = {
		data: function () {
			return {
				greeting: 'This is the login page'
			}
		},
		methods: {
			login() {
				this._authenticationService.login();
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