<template>
	<div class="container-fluid">
		<div class="row flex-nowrap">
			<Dashboard-Sidebar></Dashboard-Sidebar>
			<div class="col-md-6 py-3">
				<div v-if="!organization.isApproved && !organization.isLoading">
					<h1>Opportunity Submissions</h1>
					<p>IN2IT must review all organizations before they can be allowed to post opportunities on this website.</p>
					<h3>We are currently waiting for approval!</h3>
					<hr>
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
	
</style>