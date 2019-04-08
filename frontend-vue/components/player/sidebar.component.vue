<template>
	<div class="side-bar">
		<p>{{ vid ? vid : '' }}</p>
	</div>
</template>

<script>
	module.exports = {
		props: ['vid'],
		data: function() {
			return {};
		}
	};
</script>

<style scoped>
	.side-bar {
		position: fixed;
		top: 0;
		right: 0;
		height: 100vh;
		width: 40vw;
		max-width: 380px;
		background-color: rgba(105, 33, 33, 0.7);
		color: white;
	}
	p {
		font-size: 2em;
		text-align: center;
	}
</style>