<template>
	<div class="in2it-overlay-form">
		<h1 class="in2it-heading">Find Opportunities</h1>

		<form class="row gx-3 gy-2 align-items-center in2it-form">
			<div class="col-auto">
				<input id="startDate" class="form-control" type="date"/>
				<span id="startDateSelected"></span>
			</div>

			<div class="col-auto">
				<input id="startDate" class="form-control" type="date" />
				<span id="startDateSelected"></span>
			</div>

			<div class="col-auto">
				<label class="visually-hidden" for="specificSizeSelect">Preference</label>
				<select class="form-select" id="specificSizeSelect">
					<option selected>Neighborhood</option>
					<option value="river-north">River North</option>
					<option value="fulton-market">Fulton Market</option>
					<option value="west-loop">West Loop</option>
					<option value="south-loop">South Loop</option>
					<option value="near-north">Near North</option>
				</select>
			</div>

			<div class="col-auto">
				<label class="visually-hidden" for="searchTerms">Search Terms</label>
				<div class="input-group">
					<input type="text" class="form-control" id="searchTerms" placeholder="Enter search terms">
					<button type="submit" class="btn btn-primary in2it-form-button">Search</button>
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
		</form>
	</div>
</template>

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
		opacity:0.85;
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
		color:#fff;
		font-size:16px;
		border: 1px solid #0BAB9C;
	}
</style>