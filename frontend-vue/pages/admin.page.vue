<template>
	<div>
		<p>{{ greeting }}</p>
	</div>
</template>

<script>
	module.exports = {
		beforeRouteEnter (to, from, next) {
			next(ref => {
				ref._authenticationService.isAdmin() ? next() : next('/login')
			})
		},
		data: function () {
			return {
				greeting: 'This is the admin page. You shouldn\'t be here if you aren\'t logged in as an admin'
			}
		}
	}
</script>

<style scoped>
	p {
		font-size: 2em;
		text-align: center;
	}
</style>