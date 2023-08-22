<template>
	<div class="in2it-home-background">
		<div class="in2it-overlay-form">
			<div v-if="!submission.state">
				<h1>Welcome back</h1>
				<p>Log in to your account or <a href="/auth/sign-up">register</a>.</p>
				<form @submit.prevent="signIn">
					<div class="mb-3">
						<label for="email" class="form-label">Email</label>
						<input type="email" class="form-control" id="email" v-model="email" name="email" placeholder="Enter your email" required>
					</div>
					
					<button type="submit" class="btn btn-primary sign-in-btn in2it-btn">Sign in with Email</button>
				</form>
			</div>
			<div class="d-flex flex-column align-items-center" v-if="submission.state">
				<img src="/img/icons/check-circle-outline.svg" width="84" height="84">
				<h1 class="text-center">Check your inbox</h1>
				<p class="text-center">In a few moments, you will receive an email from us. <br>
					Confirm your identity by clicking the link in the email.
				</p>
			
				<p>Don't have an account? <a href="/auth/sign-up" style="text-decoration: none;">Register</a>.</p>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

	const email = useState('email');
	const submission = reactive({state: false});

	const signIn = async () => {
		console.log('sign in attempt', email.value);

		const auth = getAuth();
		const actionCodeSettings = {
			url: window.location.protocol + '//' + window.location.host + '/dashboard',
			handleCodeInApp: true
		};
		sendSignInLinkToEmail(auth, email.value, actionCodeSettings)
		.then(() => {
			console.log('submission was successul! Setting ' + email.value + ' localStorage');
			// The link was successfully sent. Inform the user.
			// Save the email locally so you don't need to ask the user for it again
			// if they open the link on the same device.
			window.localStorage.setItem('emailForSignIn', email.value);
			submission.state = true;
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

<style>
	.sign-in-btn{
		width:100%;
		height:48px;
		font-size:20px;
	}
</style>