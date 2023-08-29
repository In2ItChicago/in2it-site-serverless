<template>
	<div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark in2it-sidebar">
		<div class="d-flex flex-column align-items-center align-items-sm-start px-1 pt-2 text-white min-vh-100">
			<span class="fs-5 d-none d-sm-inline dashboard-title">DASHBOARD</span>

			<ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
				<li class="nav-item in2it-sidebar-nav">
					<a href="/dashboard/organization" class="nav-link px-0 align-middle">
						<i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">My Organization</span> </a>
				</li>
				<li class="nav-item in2it-sidebar-nav">
					<a href="/dashboard/opportunities/list" class="nav-link px-0 align-middle">
						<i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">My Opportunities</span> </a>
				</li>
				<li class="nav-item in2it-sidebar-nav">
					<a href="/dashboard/opportunities/add" class="nav-link px-0 align-middle">
						<i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Add New Opportunity</span> </a>
				</li>
			</ul>
			<hr>
		</div>
	</div>
</template>

<style>
	.in2it-sidebar{
		background: transparent linear-gradient(3deg, #4DA89C 0%, #0bab9c 100%) 0% 0% no-repeat padding-box;
	}

	.dashboard-title{
		margin-top:10px;
		margin-bottom:10px;
		font-size:16px !important;
		font-weight: 500;
	}

	.in2it-sidebar-nav{
		font-size: 18px;
		font-weight:500;
	}

	.in2it-sidebar-nav a {
		font-family:'Nunito', sans-serif;
		font-size:20px;
		color:#fff;
		padding:6px;
		opacity:0.9;
	}

	.in2it-sidebar-nav a:hover {
		color:#034a57;
	}
</style>