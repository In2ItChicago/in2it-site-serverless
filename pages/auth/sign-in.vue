<template>
	<div class="in2it-home-background">
		<div class="in2it-overlay-form">
			<div v-if="!submission.state">
				<h1>Welcome back</h1>
				<p>Log in to your account or <a href="/auth/sign-up">register</a>.</p>
				<form @submit.prevent="signIn">
					<div class="mb-3">
						<input type="email" class="form-control" id="email" v-model="user.email" name="email" placeholder="Email" required>
					</div>

					<div class="mb-3">
						<input 
							type="password" 
							id="password" 
							placeholder="Password"
							v-model="user.password" 
							class="form-control" required
						>
						<div class="invalid-feedback">
							Please enter a password.
						</div>
					</div>

					<div class="alert alert-danger" role="alert" v-if="submission.errorMessage">
						{{ submission.errorMessage }}
					</div>
					
					<button type="submit" class="btn btn-primary sign-in-btn in2it-btn">Sign in with Email</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";

	const user = reactive({
		email: '',
		name: '',
		password: '',
	});

	const submission = reactive({
		state: false,
		errorMessage: ''
	});

	const signIn = async () => {
		console.log('sign in attempt', user.email);

		const auth = getAuth();
		const actionCodeSettings = {
			url: window.location.protocol + '//' + window.location.host + '/dashboard',
			handleCodeInApp: true
		};
		signInWithEmailAndPassword (auth, user.email, user.password)
		.then((userCredential) => {
			console.log('submission was successul! Setting ' + user.email + ' localStorage');
			console.log('userCredential', userCredential);

			submission.state = true;

			navigateTo('/dashboard/organization');
		})
		.catch((error) => {
			submission.errorMessage = error.message;
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