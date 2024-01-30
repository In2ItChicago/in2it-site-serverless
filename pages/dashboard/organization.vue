<template>
	<div class="container-fluid">
		<div class="row flex-nowrap">
			<Dashboard-Sidebar></Dashboard-Sidebar>
			<div class="col-sm-12 col-md-8 col-xl-8 col-xxl-4 py-3">
				<div v-if="!organization.isApproved && !organization.isLoading" class="alert alert-warning" role="alert">
					<div class="row">
						<div class="col-auto d-flex justify-content-center">
							<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
								<symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
								<path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
								</symbol>
							</svg>
							<svg class="bi" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
						</div>
						<div class="col">
							<b>Account pending approval</b><br>
							
							IN2IT reviews all organizations before their opportunities can appear on this website. Most organizations are approved within 3 business days. You can expect to receive an email from us soon!

							<br>
							<br>

							In the meantime, feel free to <a class="alert-anchor" href="/dashboard/opportunities/add">add an opportunity.</a> It will automatically appear on the website as soon as your account is approved by the IN2IT team.
						</div>
					</div>
				</div>

				<h1>My Organization</h1>
				<div v-if="organization.isLoading">
					<div class="spinner-border mt-3" role="status" style="color: #034a57; width: 100px; height: 100px;">
						<span class="visually-hidden">Loading...</span>
					</div>
				</div>
				<form @submit.prevent="submitForm" class="needs-validation" novalidate v-else>
					<div class="mb-3">
						<label for="event-name" class="form-label">Organization Name</label>
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
						<label for="event-name" class="form-label">Organization Mission</label>
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
						<label for="website" class="form-label">Organization Website</label>
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

					<button type="submit" class="btn btn-primary in2it-btn submit-btn">Save Details</button>
				</form>
				<div class="d-flex align-items-center mt-2 flex-column" v-if="organization.detailsSaved">
					<img src="/img/icons/check-circle-outline.svg" width="50" height="50">
					<label>Details Saved!</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { getAuth } from "firebase/auth";
	import { doc, getDoc, setDoc} from "firebase/firestore";
	const db = useFirestore();

	definePageMeta({
		middleware: ['auth'],
	});

	const organization = reactive({
		isLoading: true,
		ownerUid: '',
		name: '',
		mission: '',
		website: '',
		isApproved: false,
		detailsSaved: false
	});

	// This only runs client-side
	onMounted(async () => {
		const auth = getAuth();
		organization.ownerUid = auth.currentUser.uid;

		const orgRef = doc(db, 'organizations', auth.currentUser.uid);
		const docSnap = await getDoc(orgRef);
		if (docSnap.exists()) {
			//Populate form
			const data = docSnap.data();
			organization.name = data.name;
			organization.mission = data.mission;
			organization.website = data.website;
		}

		const approvalRef = doc(db, 'approved_org_uids', auth.currentUser.uid);
		const approvalSnap = await getDoc(approvalRef);
		if (approvalSnap.exists()) {
			organization.isApproved = true;
		}
		else {
			organization.isApproved = false;
		}

		organization.isLoading = false;
	});

	const submitForm = async () => {
		//Update the org's data
		const auth = getAuth();
		organization.ownerUid = auth.currentUser.uid;

		await setDoc(doc(db, 'organizations', organization.ownerUid), organization).then(docRef => {
			console.log('org details saved successfully!');
			organization.detailsSaved = true;

			setTimeout(() => organization.detailsSaved = false, 3000);
		});
	};
</script>

<style>
	.alert-anchor{
		color:#664d03;
		font-weight: bold;
	}
</style>