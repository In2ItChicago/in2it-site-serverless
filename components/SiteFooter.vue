<template>
	<footer class="in2it-footer d-flex flex-column flex-fill">
		<div class="container flex-fill">
			<div class="row">
				<div class="col d-flex flex-column mt-3">
					<a href="#" class="footer-underlined-link">For Organizers</a>
					<a href="#" class="footer-underlined-link">How to Post an Event</a>
				</div>
				<div class="col d-flex flex-column align-items-end mt-3">
					<a href="#" class="footer-underlined-link">Provide Feedback</a>
					<a href="#" class="footer-underlined-link">Contact Us</a>
				</div>
			</div>
		</div>
		<div class="container justify-self-end">
			<div class="row">
				<div class="col d-flex flex-row">
					<p class="footer-link me-5">© 2022 IN2IT</p>
					<a href="#" class="footer-link me-5">Terms of Use</a>
					<a href="#" class="footer-link me-5">Privacy Policy</a>
					<a href="#" class="footer-link me-5">Accessibility</a>
				</div>

				<div class="col d-flex flex-column">
					<a href="https://chihacknight.org/" target="_blank" class="d-flex flex-grow align-self-end">
						<img class="chihacknight-logo" src="~/assets/img/chihacknight-logo.png" />
					</a>
				</div>
			</div>
		</div>
	</footer>
</template>

<style>
	.in2it-footer{
		display:flex;
		height:300px;
		background: transparent linear-gradient(3deg, #034A57 0%, #4DA89C 100%) 0% 0% no-repeat padding-box;
	}

	.footer-underlined-link{
		color:#fff;
		margin-top:20px;
		text-decoration: underline;
		font: normal 18px Nunito;
	}

	.footer-link{
		display: flex;
		color:#fff;
		text-decoration: none;
		margin-bottom:30px;
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