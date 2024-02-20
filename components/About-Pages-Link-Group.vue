<template>
	<div class="shadow p-4 mb-5 bg-body rounded">
		<a class="d-flex about-link" :class="page == 'about-us' ? 'selected' : ''" href="/about-us">About Us</a>
		<a class="d-flex mt-3 about-link" :class="page == 'for-organizations' ? 'selected' : ''" href="/for-organizations">For Organizations</a>
		<a class="d-flex mt-3 about-link" :class="page == 'for-volunteers' ? 'selected' : ''" href="/for-volunteers">For Volunteers</a>
		<a class="d-flex mt-3 about-link" :class="page == 'join-us' ? 'selected' : ''" href="/join-us">Join the IN2IT Team</a>
	</div>
</template>

<script setup>
	const props = defineProps({
		page: {
			type: String,
			default: ''
		}
	});
</script>

<style>
	.about-link{
		text-align: left;
		font-family:'Nunito', sans-serif;
		font-size:18px;
		letter-spacing: 0px;
		color: #034A57 !important;
		opacity: 1;
		text-decoration: none;
	}

	.about-link:hover{
		text-decoration: underline;
	}

	.about-link.selected {
		text-decoration: underline;
	}
</style>