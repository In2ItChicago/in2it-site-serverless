<template>
	<footer class="in2it-footer d-flex flex-column flex-fill">
		<div class="container flex-fill">
			<div class="row">
				<div class="col d-flex flex-column mt-3">
					<a href="/about-us" class="footer-nav-link">About Us</a>
					<a href="/for-organizations" class="footer-nav-link">For Organizations</a>
					<a href="/for-volunteers" class="footer-nav-link">For Volunteers</a>
				</div>
				<div class="col d-flex flex-column align-items-end mt-3">
					<a href="/join-us" class="footer-nav-link">Provide Feedback</a>
					<a href="mailto:in2itchicago@gmail.com" class="footer-nav-link">Contact Us</a>
				</div>
			</div>
		</div>
		<div class="container justify-self-end">
			<!-- Visible only on xs screens -->
			<div class="flex-row d-block d-sm-none mt-5">
				<div class="d-flex flex-col align-items-center justify-content-center">
					<a href="https://chihacknight.org/" target="_blank">
						<img class="chihacknight-logo" src="~/assets/img/chihacknight-logo.png" />
					</a>
				</div>
			</div>

			<div class="row">
				<div class="col d-flex flex-row justify-content-center justify-content-sm-start mt-sm-4 mt-md-5">
					<p class="footer-link me-5 d-none d-sm-block">© 2024 IN2IT</p> <!-- Hidden on xs screens -->
					<a href="/terms-of-use" class="footer-link me-5 d-flex justify-content-center justify-content-md-start text-center text-md-left">Terms of Use</a>
					<a href="/privacy-policy" class="footer-link me-5 d-flex justify-content-center justify-content-md-start text-center text-md-left">Privacy Policy</a>
					<a href="/accessibility" class="footer-link me-5 d-flex justify-content-center justify-content-md-start text-center text-md-left">Accessibility</a>
				</div>

				<!-- Visible on sm screens and bigger -->
				<div class="col d-flex flex-column d-none d-sm-flex">
					<a href="https://chihacknight.org/" target="_blank" class="d-flex flex-grow align-self-end mt-sm-4 mt-md-5">
						<img class="chihacknight-logo" src="~/assets/img/chihacknight-logo.png" />
					</a>
				</div>
			</div>
			
			<!-- Visible only on xs screens -->
			<div class="flex-row d-block d-sm-none">
				<div class="d-flex flex-col align-items-center justify-content-center">
					<p class="footer-link">© 2024 IN2IT</p>
				</div>
			</div>
		</div>
	</footer>
</template>

<style>
	.in2it-footer{
		display:flex;
		margin-top:auto;
		background: transparent linear-gradient(3deg, #034A57 0%, #4DA89C 100%) 0% 0% no-repeat padding-box;
	}

	.footer-nav-link{
		color:#fff;
		margin-top:20px;
		text-decoration: none;
		font: normal 18px Nunito;
	}

	.footer-nav-link:hover{
		color:#fff;
		text-decoration: underline;
	}

	.footer-link{
		display: flex;
		color:#fff;
		white-space: nowrap;
		text-decoration: none;
		margin-bottom:30px;
	}

	.footer-link:hover{
		color:#fff;
		text-decoration: underline;
	}

	.chihacknight-logo{
		width:140px;
		height:auto;
		background-color: #fff;
		padding:5px;
		border-radius: 4px;
		margin-bottom:30px;
	}
</style>