<template>
	<div class="container">
		<div class="col-md-6">
			<h1>Login</h1>
			<form @submit.prevent="login">
				<div class="mb-3">
					<label for="email" class="form-label">Email:</label>
					<input type="email" class="form-control" id="email" v-model="email" name="email" required>
				</div>
				
				<button type="submit" class="btn btn-primary">Login</button>
			</form>
		</div>
	</div>
</template>

<script setup>
	import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

	const loading = useState('loading');
	const email = useState('email');

	const login = async () => {
		loading.value = true
		console.log('sign in attempt', email.value);

		const auth = getAuth();
		const actionCodeSettings = {
			url: 'http://localhost:3000/dashboard',
			handleCodeInApp: true
		};
		sendSignInLinkToEmail(auth, email.value, actionCodeSettings)
		.then(() => {
			console.log('submission was successul! Setting ' + email.value + ' localStorage');
			// The link was successfully sent. Inform the user.
			// Save the email locally so you don't need to ask the user for it again
			// if they open the link on the same device.
			window.localStorage.setItem('emailForSignIn', email.value);
			loading.state = false;
		// ...
		})
		.catch((error) => {
			console.error('this failed!', error);
			console.log(error.code, error.message);
			const errorCode = error.code;
			const errorMessage = error.message;
		// ...
		});
	}
</script>