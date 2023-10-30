<template>
	<div class="card my-3 event-card" @click="navigate">
		<div class="row g-0">
			<div class="col-md-4">
				<img :src="'/img/impact-area-' + opportunity.thumbnailId + '.png'" class="card-img-top featured-event-image img-fluid" alt="featured-event">
				<div class="card-img-overlay p-0" style="height:160px; width:160px;" v-if="opportunity.startDateTime">
					<h5 class="card-date-overlay">{{ overlayDate }}</h5>
				</div>
			</div>
			<div class="col-md-4">
				<div class="card-body">
					<h5 class="card-title">
						{{ opportunity.opportunityName }}
					</h5>

					<p class="organization-name">
						{{ organization.name }}
					</p>

					<p class="card-text">
						{{ opportunity.description }}
					</p>
				</div>
			</div>
			<div class="col-md-4">
				<div class="card-body d-flex flex-column">
					<p class="event-time" v-if="opportunity.startDateTime">
						{{ weekDayTime }}
					</p>

					<div class="event-icons d-flex flex-row">
						<span v-if="opportunity.isContinuous">Ongoing Event</span>
						<span v-if="opportunity.isVirtual">Virtual</span>
					</div>

					<a :href="'/opportunities/view/' + opportunity.documentId" class="btn btn-primary learn-more-button mt-2">Learn More</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { doc, getDoc } from "firebase/firestore";
	const db = useFirestore();

	const props = defineProps({
		opportunity: {
			type: Object,
			required: true
		}
	});

	const { opportunity } = props;

	let organization = reactive({});

	const overlayDate = computed(() => {
		const date = new Date(opportunity.startDateTime);
		const options = { day: 'numeric', month: 'short' };
		return date.toLocaleString('en-US', options);
	});

	const weekDayTime = computed(() => {
		const date = new Date(opportunity.startDateTime);
		const options = {
			weekday: 'long',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true
		};
		return date.toLocaleString('en-US', options);
	});

	const docRef = doc(db, "organizations", opportunity.submitterUid);
	const docSnap = await getDoc(docRef);
	
	if (docSnap.exists()) {
		organization = docSnap.data();
	}

	const navigate = () => {
		navigateTo('/opportunities/view/' + opportunity.documentId);
	};
</script>

<style>
	.learn-more-button{
		display:flex;
		align-items: center;
		justify-content: center;
		background-color:#0E857A;
		border:none;
		width:100%;
		height:60px;
		font-size:24px;
		font: normal normal bold 24px/32px Nunito;
	}

	.learn-more-button:hover, .learn-more-button:active, .learn-more-button:focus{
		background-color:#0a5850;
	}

	.event-card{
		border-radius:0px;
		filter:drop-shadow(0px 4px 4px #00000040)
	}

	.featured-event-image{
		width:auto;
		max-height:100%;
		border-radius:0px;
	}

	.card-date-overlay{
		display:flex;
		color:#fff;
		width:80px;
		height:80px;
		padding:15px;
		background-color:#CF560A;
		text-align: center;
	}

	.card-title{
		font-size:26px;
		color:#104A57;
	}

	.organization-name{
		color:#CF560A;
		font-size: 16px;
		font: normal normal bold 16px/22px Nunito;
	}

	.event-time{
		font-size: 16px;
		color: #034A57;
		font: normal normal bold 16px/22px Nunito;
	}

	.event-icons{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>