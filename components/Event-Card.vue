<template>
	<div class="col-sm-12 col-md-6 col-lg-3">
		<div class="card my-3 event-card">
			<img src="~/assets/img/featured-event.jpg" class="card-img-top featured-event-image img-fluid" alt="featured-event">
			<div class="card-img-overlay p-0" style="height:160px;">
				<h5 class="card-date-overlay">Apr 16</h5>
			</div>
			
			<div class="card-body">
				<h5 class="card-title">
					Opportunity Title
				</h5>

				<p class="organization-name">
					Organization Name
				</p>

				<p class="card-text">
					Brief description…Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam tempor invidunt ut labore et.
				</p>

				<p class="event-time">
					Tuesday, 7:00pm
				</p>

				<div class="event-icons d-flex flex-row">
					<span>Ongoing Event</span>
					<span>Virtual</span>
				</div>

				<a href="#" class="btn btn-primary learn-more-button mt-2">Learn More</a>
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

	.event-card{
		border-radius:0px;
		filter:drop-shadow(0px 4px 4px #00000040)
	}

	.featured-event-image{
		max-height:160px;
		width:auto;
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