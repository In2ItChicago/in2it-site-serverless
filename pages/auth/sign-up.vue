<template>
	<div class="in2it-home-background">
		<div class="in2it-overlay-form">
			<div v-if="!submission.state">
				<form @submit.prevent="signUp" class="needs-validation" novalidate>
					<h1>Register</h1>
					<div class="mb-3">
						<label for="user-email" class="form-label">Email</label>
						<input 
							type="email" 
							id="user-email" 
							placeholder="Enter your email"
							v-model="user.email" 
							class="form-control in2it-form" required
						>
						<div class="invalid-feedback">
							Please enter your email address.
						</div>
					</div>
					<div class="mb-3">
						<label for="user-name" class="form-label">Name</label>
						<input 
							type="text" 
							id="user-name" 
							placeholder="Enter your name"
							v-model="user.name" 
							class="form-control" required
						>
						<div class="invalid-feedback">
							Please enter your name.
						</div>
					</div>
					<button type="submit" class="btn btn-primary sign-up-btn in2it-btn">Register</button>
				</form>

				<div class="d-flex justify-content-center">
					<p class="d-flex mt-4">Already have an account? <a class="d-flex mx-1" href="/auth/sign-in">Sign in</a></p>
				</div>
			</div>

			<div class="d-flex flex-column align-items-center" v-if="submission.state">
				<img src="/img/icons/check-circle-outline.svg" width="84" height="84">
				<h1 class="text-center">Thanks for signing up!</h1>
				<p class="text-center">Please check your email.<br> In a few moments, you will receive a verification email to confirm your account.</p>
			
				<a href="/auth/sign-in" style="text-decoration: none;">Back to Sign-in</a>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

	const user = reactive({
		email: '',
		name: ''
	});

	const submission = reactive({state: false});

	let signUp = () => {
		console.log('we are trying to sign up', user.email);

		const auth = getAuth();
		const actionCodeSettings = {
			url: window.location.protocol + '//' + window.location.host + '/dashboard',
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

<style>
	.sign-up-btn{
		width:100%;
		height:48px;
		font-size:20px;
	}
</style>