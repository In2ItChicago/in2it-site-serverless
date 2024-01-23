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
						v-model="data.opportunity.opportunityName" 
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
						v-model="data.opportunity.websiteLink" 
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
						v-model="data.opportunity.description" 
						class="form-control" 
						required></textarea>
					<div class="invalid-feedback">
						Please enter a description of this data.opportunity.
					</div>
				</div>

				<div class="mb-3">
					<div class="d-flex flex-column">
						<label class="form-label">Featured thumbnail</label>
						<img 
							:src="data.opportunity.thumbnailId ? '/img/impact-area-' + data.opportunity.thumbnailId + '.png' : '/img/impact-area-nature-conservation.png'" 
							class="img-thumbnail showcase-thumbnail" 
							:alt="data.opportunity.thumbnailId"
						>
					</div>
				</div>

				<div class="mb-5">
					<label class="form-label">Select an alternative thumbnail for this opportunity</label>
					<div v-for="thumbnail in thumbnails">
						<img 
							:src="thumbnail.src" 
							:id="thumbnail.alt"
							:class="[thumbnail.alt == data.opportunity.thumbnailId ? 
								'img-thumbnail rounded float-start opportunity-thumbnail thumbnail-selected' :
								'img-thumbnail rounded float-start opportunity-thumbnail']" 
							:alt="thumbnail.alt"
							@click="selectThumbnail"
						>
					</div>
				</div>
			</div>
			<div class="step" v-else-if="steps.current == 1">
				<h2>2. When is it?</h2>
				<div class="mb-3">
					<label class="form-check-label" for="isContinuous">
						Is this a <b>continuous</b> opportunity? (No exact start/end date)
					</label>
					<input class="form-check-input" type="checkbox" v-model="data.opportunity.isContinuous" id="isContinuous">
				</div>

				<div v-if="!data.opportunity.isContinuous">
					<div class="mb-3">
						<label for="event-start-date" class="form-label">Event Start Date & Time</label>
						<VueDatePicker v-model="data.opportunity.startDateTime" id="event-start-date" placeholder="Start date" />
						<div class="invalid-feedback">
							Please enter a valid event date.
						</div>
					</div>

					<div class="mb-3">
						<label class="form-check-label" for="isMultiDay">
							Is this a <b>multi-day</b> opportunity?
						</label>
						<input class="form-check-input" type="checkbox" v-model="data.opportunity.isMultiDay" id="isMultiDay">
					</div>

					<div v-if="data.opportunity.isMultiDay" class="mb-3">
						<label for="event-end-date" class="form-label">Event End Date</label>
						<VueDatePicker v-model="data.opportunity.endDateTime" id="event-end-date" placeholder="End date" />
						<div class="invalid-feedback">
							Please enter a valid event date.
						</div>
					</div>

					<div class="mb-3">
						<label class="form-check-label" for="isRecurring">
							Is this a <b>recurring</b> opportunity?
						</label>
						<input class="form-check-input" type="checkbox" v-model="data.opportunity.isRecurring" id="isRecurring">
					</div>

					<div v-if="data.opportunity.isRecurring">
						<div class="mb-3">
							<label class="form-check-label" for="isWeeklyRecurring">
								This opportunity reoccurs at the same time every week?
							</label>
							<input class="form-check-input" type="checkbox" v-model="data.opportunity.isWeeklyRecurring" id="isWeeklyRecurring">
						</div>

						<div class="mb-3">
							<label class="form-check-label" for="isMonthlyRecurring">
								This opportunity reoccurs monthly?
							</label>
							<input class="form-check-input" type="checkbox" v-model="data.opportunity.isMonthlyRecurring" id="isMonthlyRecurring">
						</div>

						<div class="mb-3">
							<label class="form-check-label" for="isBiweeklyRecurring">
								This opportunity reoccurs biweekly (every other week)?
							</label>
							<input class="form-check-input" type="checkbox" v-model="data.opportunity.isBiweeklyRecurring" id="isBiweeklyRecurring">
						</div>

						<div class="mb-3">
							<label class="form-check-label" for="numberOfOccurrences">
								Enter the number of occurrences
							</label>
							<input class="form-control" type="number" v-model="data.opportunity.numberOfOccurrences" id="numberOfOccurrences">
						</div>
					</div>
				</div>
			</div>
			<div class="step" v-else-if="steps.current == 2">
				<h2>3. What do volunteers need to know?</h2>
				<div class="mb-3">
					<label for="opportunity-activities" class="form-label">Volunteer Activities</label>
					<textarea 
						id="opportunity-activities" 
						placeholder="What will volunteers be doing? Please list any skills that are required." 
						v-model="data.opportunity.volunteerActivities" 
						class="form-control" 
						required></textarea>
					<div class="invalid-feedback">
						Please enter the skills and activities of this data.opportunity.
					</div>
				</div>

				<div class="mb-3">
					<label for="participation-mission" class="form-label">Participation & Mission</label>
					<textarea 
						id="participation-mission" 
						placeholder="How does participation contribute to your organization's mission?"
						v-model="data.opportunity.missionContribution" 
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
									v-model="data.opportunity.impactAreas"
									:value="area.id"
									/>
									{{ area.name }}
							</label>
						</li>
					</ul>
				</div>
			</div>
			<div class="step" v-else-if="steps.current == 3">
				<h2>4. Where is it?</h2>
				<div class="mb-3">
				<label for="address" class="form-label">Street Address</label>
					<input 
						type="text" 
						id="address" 
						placeholder="Where will this opportunity take place?"
						v-model="data.opportunity.address" 
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
					<input class="form-check-input" type="checkbox" v-model="data.opportunity.isVirtual" id="isVirtual">
				</div>

				<div class="mb-3">
					<label class="form-check-label" for="isHybrid">
						Is this a hybrid opportunity? (Remote and in person)
					</label>
					<input class="form-check-input" type="checkbox" v-model="data.opportunity.isHybrid" id="isHybrid">
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
									v-model="data.opportunity.accommodations"
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
						v-model="data.opportunity.accomodationsOther" 
						class="form-control"
					>
				</div>

				<div class="mb-3">
					<label class="form-check-label" for="hasStrenuousActivity">
						Will participants be required to perform any strenuous physical activities?
					</label>
					<input class="form-check-input" type="checkbox" v-model="data.opportunity.hasStrenuousActivity" id="hasStrenuousActivity">
				</div>

				<div v-if="data.opportunity.hasStrenuousActivity" class="mb-3">
					<label for="strenuousActivityDetails" class="form-label">Please describe any strenuous physical activities:</label>
					<textarea 
						id="strenuousActivityDetails" 
						placeholder="Please enter a brief description of any activities which might require significant physical effort. Ex. lifting heavy objects (over 30lbs), lots of walking, etc"
						v-model="data.opportunity.strenuousActivityDescription" 
						class="form-control"></textarea>
				</div>

				<div class="mb-3">
					<label for="additionalInformation" class="form-label">Is there any additional information you would like to share with prospective volunteers?</label>
					<textarea 
						id="additionalInformation" 
						placeholder="Please enter any important information that has not yet been addressed"
						v-model="data.opportunity.additionalInformation" 
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
			<div v-if="data.method == 'add'">
				<button 
					type="submit"
					class="btn btn-lg in2it-btn mt-2"
					v-if="steps.current == steps.maxSteps - 1"
					@click="submitForm">
					Submit Opportunity
				</button>
			</div>
			<div v-if="data.method == 'edit'">
				<button 
					type="submit"
					class="btn btn-lg in2it-btn mt-2"
					@click="submitForm">
					Save Opportunity
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import VueDatePicker from '@vuepic/vue-datepicker';
	import '@vuepic/vue-datepicker/dist/main.css';	

	const props = defineProps({
		data: {
			type: Object,
			required: true
		}
	});

	const { data } = props;
	const emit = defineEmits(['submit']);
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
		data.opportunity.startDateTime = formatDate(data.opportunity.startDateTime);
		data.opportunity.endDateTime = formatDate(data.opportunity.endDateTime);

		emit('submit');
	};

	let selectThumbnail = (e) => {
		data.opportunity.thumbnailId = e.srcElement.id;
	};

	const formatDate = (date) => {
		try {
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			const hours = String(date.getHours()).padStart(2, '0');
			const minutes = String(date.getMinutes()).padStart(2, '0');

			const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
			return formattedDate;
		}
		catch (e) {
			return '';
		}
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
		{alt: 'youth', src: '/img/impact-area-youth.png'},
		{alt: 'homelessness', src: '/img/impact-area-homelessness.png'},
		{alt: 'education', src: '/img/impact-area-education.png'},
		{alt: 'other', src: '/img/impact-area-other.png'},
		{alt: 'people-disabilities', src: '/img/impact-area-people-with-disabilities.png'},
		{alt: 'community-development', src: '/img/impact-area-community-development.png'},
		{alt: 'seniors', src: '/img/impact-area-seniors.png'}
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
			{id: 'seniors', name: 'Seniors'},
			{id: 'technology', name: 'Technology'},
			{id: 'youth', name: 'Youth'},
			{id: 'other', name: 'Other'}
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

	.form-check-input{
		width:25px;
		height:25px;
		margin-left:8px;
		margin-right:12px;
		margin-top:0px;
	}

	.dp__theme_dark {
		--dp-background-color: #212121;
	}
</style>