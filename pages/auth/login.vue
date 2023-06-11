<template>
	<div class="container">
		<div class="col-md-6">
			<h1>Login</h1>
			<form @submit.prevent="login">
				<div class="mb-3">
					<label for="email" class="form-label">Email:</label>
					<input type="email" class="form-control" id="email" v-model="email" name="email" required>
				</div>
				
				<div class="mb-3">
					<label for="password" class="form-label">Password:</label>
					<input type="password" class="form-control" id="password" v-model="password" name="password" required>
				</div>
				
				<button type="submit" class="btn btn-primary">Login</button>
			</form>
		</div>
	</div>
</template>

<script setup>
	import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

	const loading = useState('loading');
	const email = useState('email');
	const password = useState('password');

	let currentUser = await getCurrentUser()
	console.log('0 currentUser', currentUser);

	const login = async () => {
		loading.value = true
		console.log('sign in attempt', email.value, password.value);

		const auth = getAuth();
		signInWithEmailAndPassword(auth, email.value, password.value)
		.then((userCredential) => {
			// Signed in 
			console.log('signed in', userCredential);
			currentUser = getCurrentUser()
			console.log('1 currentUser', currentUser);
			const user = userCredential.user;
			// ...
		})
		.catch((error) => {
			console.log(error.code, error.message);
			const errorCode = error.code;
			const errorMessage = error.message;
		});
	}
</script>