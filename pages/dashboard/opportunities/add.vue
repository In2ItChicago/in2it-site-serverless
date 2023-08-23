<template>
	<div class="container-fluid">
		<div class="row flex-nowrap">
			<Dashboard-Sidebar></Dashboard-Sidebar>
			<div class="col-md-6 py-3" v-if="!submission.state">
				<h1>Add an Opportunity</h1>

				<form @submit.prevent="submitForm" class="needs-validation" novalidate>
					<div class="mb-3">
						<label for="event-name" class="form-label">Organization</label>
						<input 
							type="text" 
							id="event-name" 
							placeholder="Your organization's name"
							v-model="event.organizationName" 
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
							v-model="event.mission" 
							class="form-control" required
						>
						<div class="invalid-feedback">
							Please enter your organization's mission.
						</div>
					</div>

					<div class="mb-3">
						<label for="event-name" class="form-label">Opportunity Name</label>
						<input 
							type="text" 
							id="event-name" 
							placeholder="Name of this opportunity"
							v-model="event.opportunityName" 
							class="form-control" 
							required
						>
						<div class="invalid-feedback">
							Please enter the opportunity's name.
						</div>
					</div>

					<div class="mb-3">
						<label for="event-description" class="form-label">Description</label>
						<textarea 
							id="event-description" 
							placeholder="A brief description of this opportunity" 
							v-model="event.description" 
							class="form-control" 
							required></textarea>
						<div class="invalid-feedback">
							Please enter a description of this opportunity.
						</div>
					</div>

					<div class="mb-3">
						<label for="event-activities" class="form-label">Volunteer Activities</label>
						<textarea 
							id="event-activities" 
							placeholder="What will volunteers be doing at this opportunity? Please list any skills that are required." 
							v-model="event.volunteerActivities" 
							class="form-control" 
							required></textarea>
						<div class="invalid-feedback">
							Please enter the skills and activities of this opportunity.
						</div>
					</div>

					<div class="mb-3">
						<label for="participation-mission" class="form-label">Participation & Mission</label>
						<textarea 
							id="participation-mission" 
							placeholder="How does volunteer participation contribute to your organization's mission?"
							v-model="event.missionContribution" 
							class="form-control" 
							required></textarea>
						<div class="invalid-feedback">
							Please enter the participation & mission.
						</div>
					</div>

					<div class="mb-3">
						<label for="web-address" class="form-label">Web Address</label>
						<input 
							type="text" 
							id="web-address" 
							placeholder="The best place for updated and detailed information about this opportunity"
							v-model="event.webAddress" 
							class="form-control" 
							required
						>
						<div class="invalid-feedback">
							Please enter the opportunity's web address.
						</div>
					</div>

					<div class="mb-3">
						<label for="event-impact-areas" class="form-label">Impact Areas</label>
						<ul>
							<li v-for="area in impactAreas.items" :key="area.id" class="no-bullets">
								<label>
									<input
										type="checkbox"
										v-model="event.impactAreas"
										:value="area.id"
										/>
										{{ area.name }}
								</label>
							</li>
						</ul>
					</div>

					<div class="mb-3">
						<label for="location" class="form-label">Location</label>
						<input 
							type="text" 
							id="location" 
							placeholder="Where will this opportunity take place?"
							v-model="event.location" 
							class="form-control" 
							required
						>
						<div class="invalid-feedback">
							Please enter the opportunity's location.
						</div>
					</div>

					<div class="mb-3">
						<label class="form-check-label" for="isVirtual">
							Is this a virtual opportunity?
						</label>
						<input class="form-check-input" type="checkbox" v-model="event.isVirtual" id="isVirtual">
					</div>

					<div class="mb-3">
						<label class="form-check-label" for="isHybrid">
							Is this a hybrid opportunity? (Remote and in person)
						</label>
						<input class="form-check-input" type="checkbox" v-model="event.isHybrid" id="isHybrid">
					</div>

					<div class="mb-3">
						<label class="form-check-label" for="isContinual">
							Is this a <b>isContinual</b> opportunity? (No exact start/end date)
						</label>
						<input class="form-check-input" type="checkbox" v-model="event.isContinual" id="isContinual">
					</div>

					<div v-if="!event.isContinual">
						<div class="mb-3">
							<label for="event-start-date" class="form-label">Event Start Date & Time</label>
							<input type="datetime-local" id="event-start-date" v-model="event.startDateTime" class="form-control" required>
							<div class="invalid-feedback">
								Please enter a valid event date.
							</div>
						</div>

						<div class="mb-3">
							<label class="form-check-label" for="isMultiDay">
								Is this a <b>multi-day</b> opportunity?
							</label>
							<input class="form-check-input" type="checkbox" v-model="event.isMultiDay" id="isMultiDay">
						</div>

						<div v-if="event.isMultiDay" class="mb-3">
							<label for="event-end-date" class="form-label">Event End Date</label>
							<input type="datetime-local" id="event-end-date" v-model="event.endDateTime" class="form-control" required>
							<div class="invalid-feedback">
								Please enter a valid event date.
							</div>
						</div>

						<div class="mb-3">
							<label class="form-check-label" for="isRecurring">
								Is this a <b>recurring</b> opportunity?
							</label>
							<input class="form-check-input" type="checkbox" v-model="event.isRecurring" id="isRecurring">
						</div>

						<div v-if="event.isRecurring">
							<div class="mb-3">
								<label class="form-check-label" for="isWeeklyRecurring">
									This opportunity reoccurs at the same time every week?
								</label>
								<input class="form-check-input" type="checkbox" v-model="event.isWeeklyRecurring" id="isWeeklyRecurring">
							</div>

							<div class="mb-3">
								<label class="form-check-label" for="isMonthlyRecurring">
									This opportunity reoccurs monthly?
								</label>
								<input class="form-check-input" type="checkbox" v-model="event.isMonthlyRecurring" id="isMonthlyRecurring">
							</div>

							<div class="mb-3">
								<label class="form-check-label" for="isBiweeklyRecurring">
									This opportunity reoccurs biweekly (every other week)?
								</label>
								<input class="form-check-input" type="checkbox" v-model="event.isBiweeklyRecurring" id="isBiweeklyRecurring">
							</div>

							<div class="mb-3">
								<label class="form-check-label" for="numberOfOccurrences">
									Enter the number of occurrences
								</label>
								<input class="form-control" type="number" v-model="event.numberOfOccurrences" id="numberOfOccurrences">
							</div>
						</div>
					</div>

					<div class="mb-3">
						<label for="event-accomodations" class="form-label">Are there options for people who need the following accommodations? (Check all that apply)</label>
						<ul>
							<li v-for="accomodation in accomodations.items" :key="accomodation.id" class="no-bullets">
								<label>
									<input
										type="checkbox"
										v-model="event.accomodations"
										:value="accomodation.id"
										/>
										{{ accomodation.name }}
								</label>
							</li>
						</ul>
					</div>

					<div class="mb-3">
						<label for="otherAccomodations" class="form-label">Other Accomodations?</label>
						<input 
							type="text" 
							id="otherAccomodations" 
							placeholder="Please specify"
							v-model="event.accomodationsOther" 
							class="form-control"
						>
					</div>

					<div class="mb-3">
						<label class="form-check-label" for="hasStrenuousActivity">
							Will participants be required to perform any strenuous physical activities?
						</label>
						<input class="form-check-input" type="checkbox" v-model="event.hasStrenuousActivity" id="hasStrenuousActivity">
					</div>

					<div v-if="event.hasStrenuousActivity" class="mb-3">
						<label for="strenuousActivityDetails" class="form-label">Please describe any strenuous physical activities:</label>
						<textarea 
							id="strenuousActivityDetails" 
							placeholder="Please enter a brief description of any activities which might require significant physical effort. Ex. lifting heavy objects (over 30lbs), lots of walking, etc"
							v-model="event.strenuousActivityDescription" 
							class="form-control"></textarea>
					</div>

					<div class="mb-3">
						<label for="additionalInformation" class="form-label">Is there any additional information you would like to share with prospective volunteers?</label>
						<textarea 
							id="additionalInformation" 
							placeholder="Please enter any important information that has not yet been addressed"
							v-model="event.additionalInformation" 
							class="form-control"></textarea>
					</div>

					<button type="submit" class="btn btn-primary in2it-btn submit-btn">Add Opportunity</button>
				</form>
			</div>
			<div class="col-md-6" v-else="submission.state">
				<img src="/img/icons/check-circle-outline.svg" width="84" height="84">
				<h1>Opportunity Added!</h1>
				<span>Thank you for taking the time to add an opportunity!<br> We look forward to helping participants get connected with your organization!</span>

				<div class="my-4">
					<a href="/submit" type="submit" class="btn btn-primary in2it-btn">Submit Another</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth'],
	});

	import { getAuth } from "firebase/auth";
	import { query, where, addDoc, collection } from "firebase/firestore";
	const db = useFirestore();

	const impactAreas = {
		items: [
			{id: 'animalsPets', name: 'Animals and Pets'},
			{id: 'artsCulture', name: 'Arts and Culture'},
			{id: 'civicsVoting', name: 'Civics and Voting'},
			{id: 'communityDevelopment', name: 'Community Development'},
			{id: 'education', name: 'Education'},
			{id: 'foodHunger', name: 'Food and Hunger'},
			{id: 'homelessness', name: 'Homelessness'},
			{id: 'immigration', name: 'Immigration '},
			{id: 'justiceIncarceration', name: 'Justice and Incarceration'},
			{id: 'natureConservation', name: 'Nature and Conservation'},
			{id: 'peopleDisabilities', name: 'People with Disabilities'},
			{id: 'deniors', name: 'Seniors'},
			{id: 'technology', name: 'Technology'},
			{id: 'youth', name: 'Youth'}

		]
	};

	const accomodations = {
		items: [
			{id: 'translation', name: 'Translation'},
			{id: 'signLanguage', name: 'Sign Language'},
			{id: 'accessibleBathrooms', name: 'AccessibleBathrooms'},
			{id: 'genderNeutralBathrooms', name: 'Gender Neutral Bathrooms'},
			{id: 'closedCaptioning', name: 'Closed Captioning'},
			{id: 'wheelchairAccess', name: 'Wheelchair Access'}
		]
	};

	const event = reactive({
		orgUid:'',
		organizationName: '',
		mission: '',
		opportunityName: '',
		description: '',
		volunteerActivities: '',
		missionContribution: '',
		webAddress: '',
		impactAreas: [],
		location: '',
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
		isContinual: false,
		accomodations: [],
		accomodationsOther: '',
		hasStrenuousActivity: false,
		strenuousActivityDescription: '',
		additionalInformation: ''
	});

	const submission = reactive({state: false});

	let submitForm = () => {
		//Save the Firebase uid of the current org with the event data
		const auth = getAuth();
		event.orgUid = auth.currentUser.uid;

		//Create new event document
		addDoc(collection(db, "events"), event).then(docRef => {
			console.log('event submitted successfully!');
			submission.state = true;
			scroll(0,0);
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