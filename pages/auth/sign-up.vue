<template>
	<div class="in2it-home-background">
		<div class="in2it-overlay-form">
			<form @submit.prevent="signUp" class="needs-validation" novalidate v-if="!submission.state">
				<h1>Sign Up</h1>
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
				<button type="submit" class="btn btn-primary sign-up-btn">Sign up</button>
			</form>

			<div class="d-flex justify-content-center">
				<p class="d-flex mt-4">Already have an account? <a class="d-flex mx-1" href="/auth/sign-in">Sign in</a></p>
			</div>

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

	let signUp = () => {
		console.log('we are trying to sign up', user.email);

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

<style>
	.in2it-home-background{
		display:flex;
		height:66vh;
		background: url('~/assets/img/home-background.png');
		background-size:cover;
		align-items:start;
		justify-content:center;
		padding-bottom:80px;
	}

	.in2it-overlay-form{
		display:flex;
		flex-direction:column;
		background: #F3F3F8 0% 0% no-repeat padding-box;
		opacity:1;
		padding:20px;
		border-radius:10px;
		margin-top:10vh;
	}

	.sign-up-btn{
		width:100%;
		background-color: #0bab9c;
		border:none;
		height:48px;
		border-radius:0px;
		font-size:20px;
	}
</style>