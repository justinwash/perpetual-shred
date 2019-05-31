<template>
	<div class="login-page">
		<div v-bind:class="'nav-button'" v-on:click="$router.push('/')">
			<img class="nav-button-inner" src="assets/images/nav-logo.svg" />
		</div>
		<transition name="fade">
			<div v-if="currentForm == 'login'" class="form">
				<p>Log in to Perpetual Shred</p>
				<input
					v-model="loginPayload.email"
					label="Email"
					placeholder="your@email.address"
					v-on:keyup.enter="login"
				/>
				<input
					type="password"
					v-model="loginPayload.password"
					label="Password"
					placeholder="password"
					v-on:keyup.enter="login"
				/>
				<br />
				<button
					type="submit"
					class="form-button"
					v-on:click="login"
					:disabled="!(this.loginPayload.email && this.loginPayload.password)"
				>
					SEND IT!
				</button>
				<a class="form-toggle-button" v-on:click="toggleForm()"
					>Not registered?</a
				>
			</div>
		</transition>
		<transition name="fade">
			<div v-if="currentForm == 'register'" class="form">
				<p>Create a Perpetual Shred account</p>
				<input
					v-model="registerPayload.name"
					label="Username"
					placeholder="username"
					v-on:keyup.enter="login"
				/>
				<input
					v-model="registerPayload.email"
					label="Email"
					placeholder="your@email.address"
					v-on:keyup.enter="login"
				/>
				<input
					type="password"
					v-model="registerPayload.password"
					label="Password"
					placeholder="password"
					v-on:keyup.enter="login"
				/>
				<br />
				<button
					v-on:click="register"
					class="form-button"
					:disabled="
						!(
							this.registerPayload.name &&
							this.registerPayload.email &&
							this.registerPayload.password
						)
					"
				>
					SIGN ME UP
				</button>
				<a class="form-toggle-button" v-on:click="toggleForm()"
					>Already have an account?</a
				>
			</div>
		</transition>
	</div>
</template>

<script>
	module.exports = {
		data: function() {
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
				registerStatus: null,
				currentForm: 'login'
			};
		},
		methods: {
			login() {
				if (this.loginPayload.email && this.loginPayload.password) {
					PS._authenticationService.login(this.loginPayload).then((res) => {
						if (res.status === 200) {
							this.loginStatus = true;
							this.validationMessage = false;
							this.$router.push('/');
						} else {
							this.loginStatus = false;
							PS._toastService.toast(
								'heartbreak',
								'Incorrect username or password'
							);
						}
					});
				} else PS._toastService.toast('heartbreak', 'All fields are required');
			},
			register() {
				if (
					this.registerPayload.name &&
					this.registerPayload.email &&
					this.registerPayload.password
				) {
					PS._authenticationService.register(this.registerPayload).then((res) => {
						if (res.status === 200) {
							this.registerStatus = true;
							this.validationMessage = false;
							this.$router.push('/');
						} else if (res.status === 403) {
							this.registerStatus = false;
							PS._toastService.toast('heartbreak', 'Email already in use');
						} else {
							this.registerStatus = false;
							PS._toastService.toast('heartbreak', 'Something went wrong');
						}
					});
				} else PS._toastService.toast('heartbreak', 'All fields are required');
			},
			toggleForm() {
				if (this.currentForm === 'login') this.currentForm = 'register';
				else this.currentForm = 'login';
			}
		}
	};
</script>

<style scoped>
	div {
		text-align: center;
	}

	.login-page {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 100vh;
		background: #000;
		color: white;
		position: fixed;
		top: 0;
	}

	.nav-button {
		position: absolute;
		left: 1rem;
		top: 1rem;
		width: 6rem;
		border-radius: 50%;
		opacity: 1;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
		transition: 0.2s;
		cursor: pointer;
	}

	p {
		font-size: 2em;
		text-align: center;
	}

	.form {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		position: absolute;
	}

	.form-toggle-button {
		position: fixed;
		bottom: 1rem;
		cursor: pointer;
	}

	input {
		display: block;
		margin: auto auto;
		margin-bottom: 1rem;
		padding: 0.5em 0;
		border: none;
		border-bottom: 1px solid #eaeaea;
		color: #fff;
		background: black;
		font-size: 1.5rem;
	}

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus textarea:-webkit-autofill,
	textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,
	select:-webkit-autofill,
	select:-webkit-autofill:hover,
	select:-webkit-autofill:focus {
		-webkit-text-fill-color: white;
		box-shadow: 0 0 0px 1000px #000 inset;
		-webkit-box-shadow: 0 0 0px 1000px #000 inset;
	}

	.form-button {
		background-color: rgba(105, 33, 33, 1);
		border: none;
		color: white;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		cursor: pointer;
	}
	.form-button:active {
		background-color: rgba(105, 33, 33, 0.7);
	}
	.form-button:disabled {
		background-color: rgba(105, 33, 33, 0.7);
		color: gray;
	}
</style>