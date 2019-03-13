<template>
	<p>{{ greeting }}</p>
</template>

<script>
	module.exports = {
		data: function () {
			return {
				greeting: 'This is the player page'
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