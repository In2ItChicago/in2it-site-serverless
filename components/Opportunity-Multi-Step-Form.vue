<template>
	<div class="progress my-3">
		<div 
			aria-valuemax="100" 
			aria-valuemin="0" 
			:aria-valuenow="progress.percentage" 
			class="progress-bar bg-success" 
			role="progressbar" 
			:style="progress.barStyle">
		</div>
	</div>
	<div>
		<div class="d-flex" id="steps-container">
			<div class="step" v-if="steps.current == 0">
				<h2>1. Tell us about this opportunity</h2>
				<div class="mb-3">
					<label for="opportunity-name" class="form-label">Opportunity Name</label>
					<input 
						type="text" 
						id="opportunity-name" 
						placeholder="Name of this opportunity"
						v-model="opportunity.opportunityName" 
						class="form-control" 
						required
					>
					<div class="invalid-feedback">
						Please enter the opportunity's name.
					</div>
				</div>

				<div class="mb-3">
					<label for="website-link" class="form-label">Website link</label>
					<input 
						type="text" 
						id="website-link" 
						placeholder="The best place for updated and detailed information about this opportunity"
						v-model="opportunity.websiteLink" 
						class="form-control" 
						required
					>
					<div class="invalid-feedback">
						Please enter the opportunity's website link.
					</div>
				</div>

				<div class="mb-3">
					<label for="opportunity-description" class="form-label">Description</label>
					<textarea 
						id="opportunity-description" 
						placeholder="A brief description of this opportunity" 
						v-model="opportunity.description" 
						class="form-control" 
						required></textarea>
					<div class="invalid-feedback">
						Please enter a description of this opportunity.
					</div>
				</div>

				<div class="mb-3">
					<div class="d-flex flex-column">
						<label class="form-label">Featured thumbnail</label>
						<img 
							:src="opportunity.thumbnailId ? '/img/impact-area-' + opportunity.thumbnailId + '.png' : '/img/impact-area-nature-conservation.png'" 
							class="img-thumbnail showcase-thumbnail" 
							:alt="opportunity.thumbnailId"
						>
					</div>
				</div>

				<div class="mb-5">
					<label class="form-label">Select an alternative thumbnail for this opportunity</label>
					<div v-for="thumbnail in thumbnails">
						<img 
							:src="thumbnail.src" 
							:id="thumbnail.alt"
							:class="[thumbnail.alt == opportunity.thumbnailId ? 
								'img-thumbnail rounded float-start opportunity-thumbnail thumbnail-selected' :
								'img-thumbnail rounded float-start opportunity-thumbnail']" 
							:alt="thumbnail.alt"
							@click="selectThumbnail"
						>
					</div>
				</div>
			</div>
			<div class="step" v-else-if="steps.current == 1">
				<h2>2. What do volunteers need to know?</h2>
				<div class="mb-3">
					<label for="opportunity-activities" class="form-label">Volunteer Activities</label>
					<textarea 
						id="opportunity-activities" 
						placeholder="What will volunteers be doing? Please list any skills that are required." 
						v-model="opportunity.volunteerActivities" 
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
						placeholder="How does participation contribute to your organization's mission?"
						v-model="opportunity.missionContribution" 
						class="form-control" 
						required></textarea>
					<div class="invalid-feedback">
						Please enter the participation & mission.
					</div>
				</div>
				<div class="mb-3">
					<label for="opportunity-impact-areas" class="form-label">Impact Areas</label>
					<ul>
						<li v-for="area in impactAreas.items" :key="area.id" class="no-bullets">
							<label>
								<input
									type="checkbox"
									v-model="opportunity.impactAreas"
									:value="area.id"
									/>
									{{ area.name }}
							</label>
						</li>
					</ul>
				</div>
			</div>
			<div class="step" v-else-if="steps.current == 2">
				<h2>3. Where is it?</h2>
				<div class="mb-3">
				<label for="address" class="form-label">Street Address</label>
					<input 
						type="text" 
						id="address" 
						placeholder="Where will this opportunity take place?"
						v-model="opportunity.address" 
						class="form-control" 
						required
					>
					<div class="invalid-feedback">
						Please enter the opportunity's address.
					</div>
				</div>

				<div class="mb-3">
					<label class="form-check-label" for="isVirtual">
						Is this a virtual opportunity?
					</label>
					<input class="form-check-input" type="checkbox" v-model="opportunity.isVirtual" id="isVirtual">
				</div>

				<div class="mb-3">
					<label class="form-check-label" for="isHybrid">
						Is this a hybrid opportunity? (Remote and in person)
					</label>
					<input class="form-check-input" type="checkbox" v-model="opportunity.isHybrid" id="isHybrid">
				</div>
			</div>
			<div class="step" v-else-if="steps.current == 3">
				<h2>4. When is it?</h2>
				<div class="mb-3">
					<label class="form-check-label" for="isContinuous">
						Is this a <b>continuous</b> opportunity? (No exact start/end date)
					</label>
					<input class="form-check-input" type="checkbox" v-model="opportunity.isContinuous" id="isContinuous">
				</div>

				<div v-if="!opportunity.isContinuous">
					<div class="mb-3">
						<label for="event-start-date" class="form-label">Event Start Date & Time</label>
						<input type="datetime-local" id="event-start-date" v-model="opportunity.startDateTime" class="form-control" required>
						<div class="invalid-feedback">
							Please enter a valid event date.
						</div>
					</div>

					<div class="mb-3">
						<label class="form-check-label" for="isMultiDay">
							Is this a <b>multi-day</b> opportunity?
						</label>
						<input class="form-check-input" type="checkbox" v-model="opportunity.isMultiDay" id="isMultiDay">
					</div>

					<div v-if="opportunity.isMultiDay" class="mb-3">
						<label for="event-end-date" class="form-label">Event End Date</label>
						<input type="datetime-local" id="event-end-date" v-model="opportunity.endDateTime" class="form-control" required>
						<div class="invalid-feedback">
							Please enter a valid event date.
						</div>
					</div>

					<div class="mb-3">
						<label class="form-check-label" for="isRecurring">
							Is this a <b>recurring</b> opportunity?
						</label>
						<input class="form-check-input" type="checkbox" v-model="opportunity.isRecurring" id="isRecurring">
					</div>

					<div v-if="opportunity.isRecurring">
						<div class="mb-3">
							<label class="form-check-label" for="isWeeklyRecurring">
								This opportunity reoccurs at the same time every week?
							</label>
							<input class="form-check-input" type="checkbox" v-model="opportunity.isWeeklyRecurring" id="isWeeklyRecurring">
						</div>

						<div class="mb-3">
							<label class="form-check-label" for="isMonthlyRecurring">
								This opportunity reoccurs monthly?
							</label>
							<input class="form-check-input" type="checkbox" v-model="opportunity.isMonthlyRecurring" id="isMonthlyRecurring">
						</div>

						<div class="mb-3">
							<label class="form-check-label" for="isBiweeklyRecurring">
								This opportunity reoccurs biweekly (every other week)?
							</label>
							<input class="form-check-input" type="checkbox" v-model="opportunity.isBiweeklyRecurring" id="isBiweeklyRecurring">
						</div>

						<div class="mb-3">
							<label class="form-check-label" for="numberOfOccurrences">
								Enter the number of occurrences
							</label>
							<input class="form-control" type="number" v-model="opportunity.numberOfOccurrences" id="numberOfOccurrences">
						</div>
					</div>
				</div>
			</div>
			<div class="step" v-else-if="steps.current == 4">
				<h2>5. Additional Information</h2>
				<div class="mb-3">
					<label for="event-accommodations" class="form-label">Are there options for people who need the following accommodations? (Check all that apply)</label>
					<ul>
						<li v-for="accomodation in accommodations.items" :key="accomodation.id" class="no-bullets">
							<label>
								<input
									type="checkbox"
									v-model="opportunity.accommodations"
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
						v-model="opportunity.accomodationsOther" 
						class="form-control"
					>
				</div>

				<div class="mb-3">
					<label class="form-check-label" for="hasStrenuousActivity">
						Will participants be required to perform any strenuous physical activities?
					</label>
					<input class="form-check-input" type="checkbox" v-model="opportunity.hasStrenuousActivity" id="hasStrenuousActivity">
				</div>

				<div v-if="opportunity.hasStrenuousActivity" class="mb-3">
					<label for="strenuousActivityDetails" class="form-label">Please describe any strenuous physical activities:</label>
					<textarea 
						id="strenuousActivityDetails" 
						placeholder="Please enter a brief description of any activities which might require significant physical effort. Ex. lifting heavy objects (over 30lbs), lots of walking, etc"
						v-model="opportunity.strenuousActivityDescription" 
						class="form-control"></textarea>
				</div>

				<div class="mb-3">
					<label for="additionalInformation" class="form-label">Is there any additional information you would like to share with prospective volunteers?</label>
					<textarea 
						id="additionalInformation" 
						placeholder="Please enter any important information that has not yet been addressed"
						v-model="opportunity.additionalInformation" 
						class="form-control"></textarea>
				</div>
			</div>
		</div>
		<div class="mt-2">
			<button 
				class="btn btn-lg in2it-btn-secondary"
				@click="prevStep"
				v-if="steps.current > 0"
				style="margin-right:2px; height:46px;">
				Back
			</button>
			<button 
				class="btn btn-lg in2it-btn"
				v-if="steps.current < steps.maxSteps - 1"
				@click="nextStep">
				Next
			</button>
			<button 
				tpye="submit"
				class="btn btn-lg in2it-btn"
				v-if="steps.current == steps.maxSteps - 1"
				@click="submitForm">
				Submit Opportunity
			</button>
		</div>
	</div>
</template>

<script setup>
	import { getAuth } from "firebase/auth";
	import { addDoc, collection, documentId } from "firebase/firestore";
	const db = useFirestore();

	const props = defineProps({
		opportunity: {
			type: Object,
			required: true
		}
	});

	const { opportunity } = props;
	const emit = defineEmits(['success']);
	const steps = reactive({current: 0, maxSteps: 5});
	const progress = reactive({percentage: 0, barStyle: 'width:0%;'});

	const nextStep = () => {
		steps.current += 1;
		if (steps.current >= steps.maxSteps) {
			steps.current = steps.maxSteps - 1;
		}
		progress.percentage = (steps.current * 25);
		progress.barStyle = 'width: ' + progress.percentage + '%';
	};

	const prevStep = () => {
		steps.current -= 1;
		if (steps.current <= 0) {
			steps.current = 0;
		}
		progress.percentage = (steps.current * 25);
		progress.barStyle = 'width: ' + progress.percentage + '%';
	};

	let submitForm = () => {
		//Save the Firebase uid of the current org with the opportunity data
		const auth = getAuth();
		opportunity.submitterUid = auth.currentUser.uid;

		//Create new opportunity document
		addDoc(collection(db, "opportunities"), opportunity).then(docRef => {
			console.log('opportunity submitted successfully!');
			scroll(0,0);
			emit('success');
		});
	};

	let selectThumbnail = (e) => {
		opportunity.thumbnailId = e.srcElement.id;
	};

	const thumbnails = [
		{alt: 'animals', src: '/img/impact-area-animals.png'},
		{alt: 'arts-culture', src: '/img/impact-area-arts-culture.png'},
		{alt: 'food-hunger', src: '/img/impact-area-food-hunger.png'},
		{alt: 'nature-conservation', src: '/img/impact-area-nature-conservation.png'},
		{alt: 'technology', src: '/img/impact-area-technology.png'},
		{alt: 'civics-voting', src: '/img/impact-area-civics-voting.png'},
		{alt: 'immigration', src: '/img/impact-area-immigration.png'},
		{alt: 'justice-incarceration', src: '/img/impact-area-justice-incarceration.png'},
		{alt: 'youth', src: '/img/impact-area-youth.png'}
	];

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

	const accommodations = {
		items: [
			{id: 'translation', name: 'Translation'},
			{id: 'signLanguage', name: 'Sign Language'},
			{id: 'accessibleBathrooms', name: 'AccessibleBathrooms'},
			{id: 'genderNeutralBathrooms', name: 'Gender Neutral Bathrooms'},
			{id: 'closedCaptioning', name: 'Closed Captioning'},
			{id: 'wheelchairAccess', name: 'Wheelchair Access'}
		]
	};

</script>

<style>
	.opportunity-thumbnail{
		width:139px;
		height:92px;
		cursor:pointer;
	}

	.opportunity-thumbnail:hover{
		opacity:0.7;
	}

	.opportunity-thumbnail.thumbnail-selected{
		border: 4px solid #ec8a00;
		border-radius:8px;
	}

	.showcase-thumbnail{
		width:278px;
		height:184px;
	}
</style>