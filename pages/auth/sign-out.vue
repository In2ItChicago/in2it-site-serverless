<template>
	<h1 v-if="wasSuccessul">You have been signed out successfully!</h1>
</template>

<script setup>
	import { getAuth, signOut } from "firebase/auth";
	const auth = getAuth();
	let wasSuccessul = false;

	signOut(auth).then(() => {
		wasSuccessul = true;
		console.log('Sign-out successful.');
		navigateTo('/');
	}).catch((error) => {
		console.log(error);
	});
</script>