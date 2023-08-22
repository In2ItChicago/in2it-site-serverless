<template>
	<div class="in2it-home-background">
		<div class="in2it-overlay-form">
			<div class="d-flex flex-column align-items-center" v-if="signInState.failed">
				<!-- If Firebase returned an error -->
				<img src="/img/icons/alert-circle-outline.svg" width="84" height="84">
				<h1 class="text-center">Error signing in!</h1>
				<div class="alert alert-danger" role="alert">
					{{ signInState.stateMessage }}
				</div>
			
				<a href="/auth/sign-in" style="text-decoration: none;">Back to Sign-in</a>
			</div>
			<div v-else-if="signInState.mustReEnterEmail">
				<!-- If user opened link on a different device -->
				<form @submit.prevent="submitEmail" class="needs-validation" novalidate>
					<h1>Confirm Email</h1>
					<p>To finish signing in, please re-enter your email address.</p>
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
					<button type="submit" class="btn btn-primary sign-in-btn in2it-btn">Sign in with Email</button>
				</form>

				<div class="d-flex justify-content-center">
					<p class="d-flex mt-4">Already have an account? <a class="d-flex mx-1" href="/auth/sign-in">Sign in</a></p>
				</div>
			</div>
			<div v-else>
				<!-- Most common path -->
				<h1>Signing in</h1>
				<p>Please wait.</p>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

	const user = reactive({
		email: ''
	});

	const signInState = reactive({
		success: false,
		failed: false,
		stateMessage: '',
		mustReEnterEmail: false
	});

	// This only runs client-side
	onMounted(() => {
		const auth = getAuth();
		if (isSignInWithEmailLink(auth, window.location.href)) {
			// Additional state parameters can also be passed via URL.
			// This can be used to continue the user's intended action before triggering
			// the sign-in operation.
			// Get the email if available. This should be available if the user completes
			// the flow on the same device where they started it.
			let email = window.localStorage.getItem('emailForSignIn');
			if (!email) {
				// User opened the link on a different device. To prevent session fixation
				// attacks, ask the user to provide the associated email again.
				signInState.mustReEnterEmail = true;
			}
			else {
				completeSignUp(auth, email);
			}
		}
	});

	let submitEmail = () => {
		const auth = getAuth();
		completeSignUp(auth, user.email);
	};

	let completeSignUp = (auth, email) => {
		// The client SDK will parse the code from the link for you.
		signInWithEmailLink(auth, email, window.location.href)
		.then((result) => {
			console.log('sign in successful', result);
			// Clear email from storage.
			window.localStorage.removeItem('emailForSignIn');
			// You can access the new user via result.user
			// Additional user info profile not available via:
			// result.additionalUserInfo.profile == null
			// You can check if the user is new or existing:
			// result.additionalUserInfo.isNewUser

			console.log('result.user', result.user);
			signInState.success = true;

			navigateTo('/organization/dashboard');
		})
		.catch((error) => {
			console.log('sign in failed', error);
			signInState.failed = true;
			signInState.stateMessage = error.message;
			// Some error occurred, you can inspect the code: error.code
			// Common errors could be invalid email and invalid or expired OTPs.
		});
	};
</script>

<style>
	.sign-in-btn{
		width:100%;
		height:48px;
		font-size:20px;
	}
</style>