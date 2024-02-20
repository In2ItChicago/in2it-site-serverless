<template>
	<div class="shadow p-3 mb-5 bg-body rounded">
		<button class="btn btn-primary volunteer-button mt-2" @click="goToVolunteer" v-if="data.opportunity.websiteLink">
			Volunteer <img src="/img/icons/open-in-new.svg" width="24" height="24" class="mx-2"/>
		</button>
		<div class="mt-1 d-flex flex-row" v-if="data.opportunity.isContinuous">
			<img src="/img/icons/clock.svg" /> 
			<p class="mx-2 pt-3" v-if="data.opportunity.isContinuous">Ongoing Event</p>
		</div>
		<div class="mt-4" v-else></div>
		
		<h4 class="info-heading">WHEN</h4>
		<p>{{ whenDate }}</p>
		<h4 class="info-heading" v-if="where">WHERE</h4>
		<p v-if="where">{{ where }}</p>
		<div v-if="hasAccommodations">
			<h4 class="info-heading">ACCOMMODATIONS</h4>
			<ul class="p-0">
				<li v-for="accomodation in data.opportunity.accommodations" class="info-list">
					{{ accomodation.charAt(0).toUpperCase() + accomodation.slice(1) }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		data: {
			type: Object,
			required: true
		}
	});

	const { data } = props;

	const whenDate = computed(() => {
		const date = new Date(data.opportunity.startDateTime);

		// Define arrays for days of the week and months for formatting
		const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		// Get the day of the week, month, date, hour, and minutes
		const dayOfWeek = daysOfWeek[date.getDay()];
		const month = months[date.getMonth()];
		const dayOfMonth = date.getDate();
		const hour = date.getHours();
		const minutes = date.getMinutes();

		// Determine whether it's AM or PM
		const amOrPm = hour >= 12 ? 'PM' : 'AM';

		// Convert hour to 12-hour format
		const formattedHour = hour % 12 || 12;

		// Create the formatted datetime string
		return `${dayOfWeek}, ${month} ${dayOfMonth}\n${formattedHour}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
	});

	const where = computed(() => {
		if (data.opportunity.isVirtual) {
			return 'Virtual';
		}
		return data.opportunity.address;
	});

	const hasAccommodations = computed(() => {
		return data.opportunity.accommodations && data.opportunity.accommodations.length;
	});

	const goToVolunteer = () => {
		//For testing, we're we just keep user on the existing page
		return;

		//Re-enable this for launch
		window.location.href = data.opportunity.websiteLink;
	};
</script>