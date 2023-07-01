<template>
	<h1 v-if="requestState.success">You have been signed out successfully!</h1>
</template>

<script setup>
	import { getAuth, signOut } from "firebase/auth";
	const auth = getAuth();

	const requestState = reactive({success: false});

	signOut(auth).then(() => {
		requestState.success = true;
		console.log('Sign-out successful.');
	}).catch((error) => {
		console.log(error);
	});
</script>