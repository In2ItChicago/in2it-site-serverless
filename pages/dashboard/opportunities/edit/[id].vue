<template>
	<div class="container-fluid">
		<div class="row flex-nowrap">
			<Dashboard-Sidebar></Dashboard-Sidebar>
			<div class="col-md-6 py-3" v-if="!opportunityData.wasSuccessfullySaved">
				<h1>Edit Opportunity</h1>
				<OpportunityMultiStepForm 
					:data="opportunityData" 
					@submit="saveSubmission">
				</OpportunityMultiStepForm>
			</div>
			<div class="col-md-6" v-else-if="opportunityData.wasSuccessfullySaved">
				<img src="/img/icons/check-circle-outline.svg" width="84" height="84">
				<h1>Opportunity Saved!</h1>
				<span>Thank you for taking the time to update your opportunity!<br> We look forward to helping participants get connected with your organization!</span>

				<div class="my-4">
					<a href="/dashboard/opportunities/list" type="submit" class="btn btn-primary btn-lg in2it-btn">My Opportunities</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { doc, getDoc, updateDoc } from 'firebase/firestore';
	const db = useFirestore();

	definePageMeta({
		middleware: ['auth'],
	});

	const route = useRoute();
	let opportunityData = reactive({
		opportunity: null,
		wasSuccessfullySaved: false,
		isLoading: true,
		method: 'edit'
	});

	const saveSubmission = async () => {
		//Save opportunity document
		await updateDoc(docRef, opportunityData.opportunity).then(docRef => {
			console.log('opportunity saved successfully!');
			scroll(0,0);
			opportunityData.wasSuccessfullySaved = true;
		});
	};

	const docRef = doc(db, "opportunities", route.params.id);
	const docSnap = await getDoc(docRef);
	
	if (docSnap.exists()) {
		opportunityData.opportunity = docSnap.data();
		opportunityData.isLoading = false;
	}
</script>