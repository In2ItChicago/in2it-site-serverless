<template>
	<div class="container">
		<div class="col-md-6">
			<form @submit.prevent="register" class="needs-validation" novalidate v-if="!submission.state">
				<h1>Register</h1>
				<div class="mb-3">
					<label for="user-email" class="form-label">Email</label>
					<input 
						type="email" 
						id="user-email" 
						placeholder="Your email address"
						v-model="user.email" 
						class="form-control" required
					>
					<div class="invalid-feedback">
						Please enter your email address.
					</div>
				</div>
				<button type="submit" class="btn btn-primary">Register</button>
			</form>
			<div class="col-md-6" v-if="submission.state">
				<h1>Success!</h1>
				<p>Thank you! An email has been sent to</p>
				<span>{{ user.email }}</span>
				<p>Please check your inbox to verify your email address and follow the instructions.</p>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

	const user = reactive({
		email: ''
	});

	const submission = reactive({state: false});

	let register = () => {
		console.log('we are trying to register', user.email);

		const auth = getAuth();
		const actionCodeSettings = {
			url: 'http://localhost:3000/dashboard',
			handleCodeInApp: true
		};
		sendSignInLinkToEmail(auth, user.email, actionCodeSettings)
		.then(() => {
			console.log('submission was successul! Setting ' + user.email + ' localStorage');
			// The link was successfully sent. Inform the user.
			// Save the email locally so you don't need to ask the user for it again
			// if they open the link on the same device.
			window.localStorage.setItem('emailForSignIn', user.email);
			submission.state = true;
		// ...
		})
		.catch((error) => {
			console.error('this failed!', error);
			const errorCode = error.code;
			const errorMessage = error.message;
		// ...
		});
	};
</script>