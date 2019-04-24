<template>
	<div class="sidebar-actions">
		<div v-on:click="toggleFav()" class="sidebar-action-button">
			<img v-if="faved" src="assets/icons/faved.svg" />
			<img v-if="!faved" src="assets/icons/fav.svg" />
		</div>
		<div v-on:click="shareVid()" class="sidebar-action-button">
			<img src="assets/icons/share.svg" />
		</div>
	</div>
</template>

<script>
	module.exports = {
		props: ['vid'],
		data: function() {
			return {
				faved: false,
				vidUrl: 'https://www.perpetualshred.com/#/vid/' + this.vid._id
			};
		},
		methods: {
			isVidFaved() {
				PS._favService
					.checkFav(this.vid)
					.then((res) => {
						this.faved = res.data;
					})
					.catch((err) => {
						PS._toastService.toast('heartbreak', err);
					});
			},
			saveFav() {
				PS._favService
					.saveFav(this.vid)
					.then((res) => {
						this.faved = res.data;
						if (this.faved)
							PS._toastService.toast('faved', 'Video added to favorites');
					})
					.catch((err) => {
						PS._toastService.toast('heartbreak', err);
					});
			},
			removeFav() {
				PS._favService
					.removeFav(this.vid)
					.then((res) => {
						this.faved = !res.data;
						PS._toastService.toast('fav', 'Video removed from favorites');
					})
					.catch((err) => {
						PS._toastService.toast('heartbreak', err);
					});
			},
			toggleFav() {
				if (this.faved) {
					this.removeFav();
				} else {
					this.saveFav();
				}
			},
			shareVid() {
				this.copyToClipboard(this.vidUrl);
				PS._toastService.toast('clip', 'Video URL copied to clipboard');
			},
			copyToClipboard(string) {
				const el = document.createElement('textarea');
				el.value = string;
				el.setAttribute('readonly', '');
				el.style.position = 'absolute';
				el.style.left = '-9999px';
				document.body.appendChild(el);
				const selected =
					document.getSelection().rangeCount > 0
						? document.getSelection().getRangeAt(0)
						: false;
				el.select();
				document.execCommand('copy');
				document.body.removeChild(el);
				if (selected) {
					document.getSelection().removeAllRanges();
					document.getSelection().addRange(selected);
				}
			}
		},
		mounted() {
			this.isVidFaved();
		}
	};
</script>

<style scoped>
	.sidebar-actions {
		display: flex;
		width: 50%;
		top: 1rem;
		color: white;
		margin-bottom: 1rem;
	}

	.sidebar-action-button {
		width: 2.2rem;
		margin-right: 1rem;
	}

	.sidebar-action-button:hover {
		cursor: pointer;
	}
</style>