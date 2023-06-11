<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container-fluid">
			<a class="navbar-brand" href="/">
				<img src="~/assets/img/in2it-logo.png" class="in2it-brand" alt="in2it-logo" width="140" height="41">
			</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse justify-content-end" id="navbarContent">
				<ul class="navbar-nav ml-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<a class="nav-link in2it-nav-link mx-2" href="#">About Us</a>
					</li>
					<li class="nav-item">
						<a class="nav-link in2it-nav-link mx-2" href="#">Join Our Team</a>
					</li>
					<li class="nav-item" v-if="isLoggedIn">
						<NuxtLink class="nav-link in2it-nav-link mx-2" to="/auth/sign-out">Sign Out</NuxtLink>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<style>
	.in2it-nav-link{
		text-align: left;
		font: Nunito;
		font-weight:500;
		font-size:20px;
		letter-spacing: 0px;
		color: #034A57;
		opacity: 1;
	}

	.in2it-brand{
		margin:12px;
	}
</style>

<script setup>
	const isLoggedIn = await getCurrentUser()
</script>