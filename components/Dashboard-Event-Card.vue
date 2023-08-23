<template>
	<div class="col-sm-12 col-md-6 col-lg-3">
		<div class="card my-3 event-card">
			<img :src="randomSrc()" class="card-img-top featured-event-image img-fluid" alt="featured-event">
			<div class="card-img-overlay p-0" style="height:160px;">
				<h5 class="card-date-overlay">Apr 16</h5>
			</div>
			
			<div class="card-body">
				<h5 class="card-title">
					{{ event.opportunityName }}
				</h5>

				<p class="organization-name">
					Organization Name
				</p>

				<p class="card-text">
					{{ event.description }}
				</p>

				<p class="event-time">
					Tuesday, 7:00pm
				</p>

				<div class="event-icons d-flex flex-row">
					<span>Ongoing Event</span>
					<span>Virtual</span>
				</div>

				<a href="#" class="btn btn-primary learn-more-button mt-2">Edit</a>
			</div>
		</div>
	</div>
</template>

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

<script setup>
	const props = defineProps({
		event: {
			type: Object,
			required: true
		}
	});

	const { event } = props;

	const imagePaths = [
		'/img/impact-area-animals.png',
		'/img/impact-area-arts-culture.png',
		'/img/impact-area-food-hunger.png',
		'/img/impact-area-nature-conservation.png',
		'/img/impact-area-technology.png',

		'/img/impact-area-civics-voting.png',
		'/img/impact-area-food-hunger.png',
		'/img/impact-area-immigration.png',
		'/img/impact-area-justice-incarceration.png',
		'/img/impact-area-nature-conservation.png',
		'/img/impact-area-youth.png'
	];

	const randomSrc = () => {
		return imagePaths[Math.floor(Math.random() * imagePaths.length)];
	};
</script>