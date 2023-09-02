<template>
	<div class="container mt-4">
		<div class="row">
			<div class="d-lg-none">
				<Volunteer-Panel :data="data"></Volunteer-Panel>
			</div>
			<div class="col-sm-12 col-md-8">
				<div class="shadow-sm p-3 mb-5 bg-body rounded">
					<h1>
						{{ data.opportunity.opportunityName }}
					</h1>

					<h2 class="organization-name py-2">
						{{ data.organization.name }}
					</h2>

					<p>
						{{ data.opportunity.description }}
					</p>

					<div v-if="data.opportunity.volunteerActivities">
						<h3 class="mt-2">Volunteer Activities</h3>
						<p>
							{{ data.opportunity.volunteerActivities }}
						</p>
					</div>

					<div v-if="data.opportunity.missionContribution">
						<h3 class="mt-2">Participation & Mission</h3>
						<p>
							{{ data.opportunity.missionContribution }}
						</p>
					</div>

					<div v-if="data.opportunity.additionalInformation">
						<h3 class="mt-2">Additional Info</h3>
						<p>
							{{ data.opportunity.additionalInformation }}
						</p>
					</div>

					<div v-if="data.opportunity.accommodationsOther">
						<h3 class="mt-2">Accommodations</h3>
						<p>
							{{ data.opportunity.accommodationsOther }}
						</p>
					</div>

					<div v-if="hasImpactAreas">
						<h3 class="mt-2">Impact Areas</h3>
						<ul class="p-0">
							<li v-for="area in data.opportunity.impactAreas" class="info-list">
								{{ area.charAt(0).toUpperCase() + area.slice(1) }}
							</li>
						</ul>
					</div>

					<div v-if="data.opportunity.hasStrenuousActivity">
						<p class="warn-text">Note: The organizer of this opportunity has specified that there may be strenuous activities.</p>
					</div>

					<iframe
						width="600"
						height="450"
						style="border:0"
						loading="lazy"
						allowfullscreen
						referrerpolicy="no-referrer-when-downgrade"
						:src="mapSrc">
					</iframe>
				</div>
				
			</div>
			<div class="col-md-4 col-sm-12 d-none d-lg-block">
				<Volunteer-Panel :data="data"></Volunteer-Panel>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { doc, getDoc } from 'firebase/firestore';
	const db = useFirestore();
	const config = useRuntimeConfig();

	const route = useRoute();
	let data = reactive({
		opportunity: null,
		organization: null,
		isLoading: true
	});

	const mapSrc = computed(() => {
		const API_KEY = 'key=' + config.public.GOOGLE_MAPS_API_KEY;
		const BASE_URL = 'https://www.google.com/maps/embed/v1/';
		let mapSrc = '';

		if (data.opportunity && data.opportunity.address.length) {
			let query = data.opportunity.address.replace(/ /g, '+');
			mapSrc = BASE_URL + 'place?q=' + query + '&' + API_KEY;
		}
		else {
			mapSrc = BASE_URL + 'view?center=41.8867465,-87.6345166&zoom=14&' + API_KEY;
		}
		return mapSrc;
	});

	const hasImpactAreas = computed(() => {
		return data.opportunity.impactAreas && data.opportunity.impactAreas.length;
	});

	let docRef = doc(db, "opportunities", route.params.id);
	let docSnap = await getDoc(docRef);
	
	if (docSnap.exists()) {
		data.opportunity = docSnap.data();

		//Get org
		docRef = doc(db, "organizations", data.opportunity.submitterUid);
		docSnap = await getDoc(docRef);
		
		if (docSnap.exists()) {
			data.organization = docSnap.data();
		}

		data.isLoading = false;
	}
</script>

<style>
	h2.organization-name {
		font-size:28px;
		color:#CF560A;
	}

	.volunteer-button{
		display:flex;
		align-items: center;
		justify-content: center;
		background-color:#0E857A;
		border:none;
		width:100%;
		height:60px;
		font-size:24px;
		border-radius: 10px;
		font: normal normal bold 24px/32px Nunito;
	}

	.volunteer-button:hover, .volunteer-button:active, .volunteer-button:focus{
		background-color:#0a5850;
	}

	.info-heading{
		color:#CF560A;
	}

	.warn-text{
		color:#cf560a;
	}

	li.info-list {
		list-style-type: none;
	}
</style>