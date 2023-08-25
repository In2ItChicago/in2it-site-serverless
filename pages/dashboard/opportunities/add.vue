<template>
	<div class="container-fluid">
		<div class="row flex-nowrap">
			<Dashboard-Sidebar></Dashboard-Sidebar>
			<div class="col-md-6 py-3" v-if="!opportunity.wasSuccessfullySubmitted">
				<h1>Add an Opportunity</h1>
				<OpportunityMultiStepForm :opportunity="opportunity" @success="saveSubmission"></OpportunityMultiStepForm>
			</div>
			<div class="col-md-6" v-else-if="opportunity.wasSuccessfullySubmitted">
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
	definePageMeta({
		middleware: ['auth'],
	});

	const opportunity = reactive({
		submitterUid:'',
		organizationName: '',
		mission: '',
		opportunityName: '',
		description: '',
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
		wasSuccessfullySubmitted: false
	});

	const saveSubmission = () => {
		opportunity.wasSuccessfullySubmitted = true;
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