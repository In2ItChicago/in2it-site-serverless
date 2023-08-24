<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container-fluid">
			<a class="navbar-brand" href="/">
				<img src="~/assets/img/in2it-logo.png" class="in2it-brand" alt="in2it-logo" width="140" height="41">
			</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse d-flex" id="navbarContent">
				<ul class="navbar-nav mb-2 mb-lg-0">
					<li class="nav-item">
						<a class="nav-link in2it-nav-link mx-2" href="/about">About Us</a>
					</li>
					<li class="nav-item">
						<a class="nav-link in2it-nav-link mx-2" href="/join-us">Join Our Team</a>
					</li>
				</ul>
				<ul class="navbar-nav mb-2 mb-lg-0 ms-auto me-3">
					<li class="nav-item" v-if="!loggedIn">
						<a class="nav-link in2it-nav-link mx-2" href="/auth/sign-in">Sign In</a>
					</li>
					<li class="nav-item" v-if="!loggedIn">
						<a class="nav-link in2it-nav-link mx-2" href="/auth/sign-up">Register</a>
					</li>
					<li class="nav-item dropdown" v-if="loggedIn">
						<a class="nav-link in2it-nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Account
						</a>
						<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
							<li><a class="dropdown-item" href="/dashboard/organization">Dashboard</a></li>
							<li><a class="dropdown-item" href="/auth/sign-out">Sign Out</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<style>
	.in2it-nav-link{
		text-align: left;
		font-family:'Nunito', sans-serif;
		font-weight:500;
		font-size:20px;
		letter-spacing: 0px;
		color: #034A57 !important;
		opacity: 1;
	}

	.in2it-brand{
		margin:12px;
	}

	.dropdown-menu{
		border-radius:0px;
		padding:0px;
	}

	.dropdown-item{
		color: #034A57;
		font-size:18px;
		font-weight:400;
		padding-top:16px;
		padding-bottom:12px;
	}

	.dropdown-item:active{
		background-color:#0bab9c;
		color:#fff;
	}
</style>

<script setup>
	const loggedIn = reactive(useCurrentUser());

</script>