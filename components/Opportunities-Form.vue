<template>
	<div class="in2it-overlay-form">
		<h1 class="in2it-heading">Find Opportunities</h1>

		<div class="row gx-3 gy-2 align-items-center in2it-form">
			<div class="col-auto">
				<VueDatePicker v-model="searchCriteria.startDate" placeholder="Start date" :enable-time-picker="false" />
				<span id="startDateSelected"></span>
			</div>

			<div class="col-auto">
				<VueDatePicker v-model="searchCriteria.endDate" placeholder="End date" :enable-time-picker="false" />
				<span id="startDateSelected"></span>
			</div>

			<div class="col-auto">
				<label class="visually-hidden" for="specificSizeSelect">Preference</label>
				<select class="form-select" id="specificSizeSelect">
					<option selected>Neighborhood</option>
					<option value="bridgeport">Bridgeport</option>
					<option value="gage-park">Gage Park</option>
					<option value="kenwood">Kenwood</option>
					<option value="lakeview">Lakeview</option>
					<option value="logan-square">Logan Square</option>
					<option value="the-loop">The Loop</option>
					<option value="north-lawndale">North Lawndale</option>
					<option value="pilsen">Pilsen</option>
					<option value="portage-page">Portage Park</option>
					<option value="rogers-park">Rogers Park</option>
					<option value="west-pullman">West Pullman</option>
				</select>
			</div>

			<div class="col-auto">
				<label class="visually-hidden" for="searchTerms">Search Terms</label>
				<div class="input-group">
					<input type="text" class="form-control" id="searchTerms" placeholder="Enter search terms">
					<button @click="search" class="btn btn-primary in2it-form-button">Search</button>
				</div>
			</div>
			
			<div class="col-auto">
				<div class="form-check d-flex align-items-center">
					<input class="form-check-input" type="checkbox" id="virtualOnly">
					<label class="form-check-label d-flex in2it-label ms-2" for="virtualOnly">
						Virtual Only
					</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import VueDatePicker from '@vuepic/vue-datepicker';
	import '@vuepic/vue-datepicker/dist/main.css';	

	const searchCriteria = reactive({
		startDate: new Date(), //Current date
		endDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000), //Two weeks from now
		neighborhood: '',
		searchTerms: '',
		virtualOnly: false
	});

	const search = () => {
		searchCriteria.startDate = formatDate(searchCriteria.startDate);
		searchCriteria.endDate = formatDate(searchCriteria.endDate);
		navigateTo({
			path: '/opportunities',
			query: searchCriteria
		});
	};

	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');

		const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
		return formattedDate;
	};
</script>

<style>
	.in2it-label{
		color:#034A57;
		font-size:16px;
		font: normal normal bold 16px/22px Nunito;
	}

	.in2it-overlay-form{
		display:flex;
		flex-direction:column;
		background: #F3F3F8 0% 0% no-repeat padding-box;
		padding:20px;
		border-radius:10px;
	}

	.in2it-heading{
		font: normal normal bold 42px/57px Nunito;
		letter-spacing: 0px;
		color: #034A57;
		opacity: 1;
		font-size:40px;
	}

	.in2it-form input, .in2it-form select{
		border-radius:0px;
		color:#034A57;
		border: 1px solid #0BAB9C;
	}

	.in2it-form input[type='checkbox']{
		width:38px;
		height:38px;
		border-radius:0px;
		margin-top:0px;
	}

	.in2it-form-button{
		border-radius:0px;
		background-color:#0BAB9C;
		opacity:1.0;
		color:#fff;
		font-size:16px;
		border: 1px solid #0BAB9C;
	}

	.in2it-form-button:hover, .in2it-form-button:active, .in2it-form-button:focus{
		background-color:#0a5850;
	}
</style>