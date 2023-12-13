<template>
	<div class="container-fluid">
		<div class="row flex-nowrap">
			<Dashboard-Sidebar></Dashboard-Sidebar>
			<div class="col-md-6 py-3" v-if="!opportunityData.wasSuccessfullySubmitted">
				<h1>Add a New Opportunity</h1>
				<OpportunityMultiStepForm 
					:data="opportunityData" 
					@submit="saveSubmission">
				</OpportunityMultiStepForm>
			</div>
			<div class="col-md-6" v-else-if="opportunityData.wasSuccessfullySubmitted">
				<img src="/img/icons/check-circle-outline.svg" width="84" height="84">
				<h1>Opportunity Added!</h1>
				<span>Thank you for taking the time to add an opportunity!<br> We look forward to helping participants get connected with your organization!</span>

				<div class="my-4">
					<a href="/dashboard/opportunities/add" type="submit" class="btn btn-primary btn-lg in2it-btn">Add Another</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { getAuth } from "firebase/auth";
	import { addDoc, collection } from 'firebase/firestore';
	const db = useFirestore();

	definePageMeta({
		middleware: ['auth'],
	});

	let getTimestamp = () => {
		const date = new Date(); // Get the current date and time

		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			timeZoneName: 'short',
			timeZone: 'America/Chicago',
		};

		const formatter = new Intl.DateTimeFormat('en-US', options);

		return formatter.format(date);
	};

	const opportunityData = reactive({
		method: 'add',
		wasSuccessfullySubmitted: false,
		opportunity: {
			submitterUid:'',
			organizationName: '',
			mission: '',
			opportunityName: '',
			description: '',
			thumbnailId: '',
			volunteerActivities: '',
			missionContribution: '',
			websiteLink: '',
			impactAreas: [],
			address: '',
			isVirtual: false,
			isHybrid: false,
			startDateTime: '',
			isMultiDay: false,
			endDateTime: '',
			isRecurring: false,
			isWeeklyRecurring: false,
			isMonthlyRecurring: false,
			isBiweeklyRecurring: false,
			isVariableRecurring: false,
			numberOfOccurrences: false,
			isContinuous: false,
			accommodations: [],
			accomodationsOther: '',
			hasStrenuousActivity: false,
			strenuousActivityDescription: '',
			additionalInformation: '',
			submittedAt: getTimestamp()
		}
	});

	const saveSubmission = () => {
		//Save the Firebase uid of the current org with the opportunity data
		const auth = getAuth();
		opportunityData.opportunity.submitterUid = auth.currentUser.uid;

		//Create new opportunity document
		addDoc(collection(db, "opportunities"), opportunityData.opportunity).then(docRef => {
			console.log('opportunity submitted successfully!');
			scroll(0,0);
			opportunityData.wasSuccessfullySubmitted = true;
		});
	};
</script>

<style>
	.no-bullets {
		list-style-type: none;
	}

	.submit-btn{
		width:100%;
		height:48px;
		font-size:20px;
	}
</style>