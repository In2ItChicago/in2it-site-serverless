<template>
	<div class="in2it-home-background">
		<div class="in2it-overlay-form">
			<div v-if="submission.step == 'emailPassword'">
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
						<label for="password" class="form-label">Password</label>
						<input 
							type="password" 
							id="password" 
							placeholder="Must have at least 6 characters"
							v-model="user.password" 
							class="form-control" required
						>
						<div class="invalid-feedback">
							Please enter a password.
						</div>
					</div>
					<button type="submit" class="btn btn-primary sign-up-btn in2it-btn">Continue</button>
				</form>

				<div class="d-flex justify-content-center">
					<p class="d-flex mt-4">Already have an account? <a class="d-flex mx-1" href="/auth/sign-in">Sign in</a></p>
				</div>
			</div>

			<div v-if="submission.step == 'orgDetails'">
				<div class="d-flex flex-column align-items-center">
					<h1 class="text-center">Thanks for signing up!</h1>
					<p class="text-center">Please tell us a little bit about your organization.</p>
				</div>
				
				<form @submit.prevent="submitOrgDetails" class="needs-validation" novalidate>
					<div class="mb-3">
						<label for="event-name" class="form-label">Name</label>
						<input 
							type="text" 
							id="event-name" 
							placeholder="Your organization's name"
							v-model="organization.name" 
							class="form-control" required
						>
						<div class="invalid-feedback">
							Please enter your organization's name.
						</div>
					</div>
					<div class="mb-3">
						<label for="event-name" class="form-label">Mission</label>
						<input 
							type="text" 
							id="event-name" 
							placeholder="Your organization's mission"
							v-model="organization.mission" 
							class="form-control" required
						>
						<div class="invalid-feedback">
							Please enter your organization's mission.
						</div>
					</div>
					<div class="mb-3">
						<label for="website" class="form-label">Website</label>
						<input 
							type="text" 
							id="website" 
							placeholder="Your organization's website"
							v-model="organization.website" 
							class="form-control" 
							required
						>
						<div class="invalid-feedback">
							Please enter your organization's website.
						</div>
					</div>

					<button type="submit" class="btn btn-primary sign-up-btn in2it-btn">Continue</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { doc, setDoc} from "firebase/firestore";
	import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
	
	const db = useFirestore();
	const user = reactive({
		email: '',
		name: '',
		password: ''
	});

	const organization = reactive({
		name: '',
		mission: '',
		website: ''
	});

	const submission = reactive({step: 'emailPassword'});

	let signUp = () => {
		console.log('we are trying to sign up', user.email);

		const auth = getAuth();
		const actionCodeSettings = {
			url: window.location.protocol + '//' + window.location.host + '/dashboard',
			handleCodeInApp: true
		};
		createUserWithEmailAndPassword(auth, user.email, user.password)
		.then((userCredential) => {
			console.log('submission was successul! Setting ' + user.email + ' localStorage');
			console.log('userCredential', userCredential);
			// The link was successfully sent. Inform the user.
			// Save the email locally so you don't need to ask the user for it again
			// if they open the link on the same device.
			window.localStorage.setItem('emailForSignIn', user.email);
			submission.step = 'orgDetails';
		// ...
		})
		.catch((error) => {
			console.error('this failed!', error);
			const errorCode = error.code;
			const errorMessage = error.message;
		// ...
		});
	};

	const submitOrgDetails = async () => {
		//Set the org's data
		const auth = getAuth();
		await setDoc(doc(db, 'organizations', auth.currentUser.uid), organization).then(docRef => {
			console.log('org details saved successfully!', organization);
			navigateTo('/dashboard/organization');
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