<template>
	<div class="info-background"></div>
	<div class="container mt-4">
		<div class="row">
			<div class="col-12 d-lg-none">
				<h1>Our Commitment to Accessibility</h1>
				<Accessibility-Contents></Accessibility-Contents>
			</div>
			<div class="col-md-8 col-sm-12">
				<h1 id="our-commitment" class="d-none d-lg-block">Our Commitment to Accessibility</h1>

				<p>IN2IT Chicago is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying relevant accessibility standards.</p>

				<h2 id="accessibility-features">Accessibility Features</h2>
				<ul>
					<li>We have designed our website with accessibility in mind.</li>
					<li>We aim to comply with the Web Content Accessibility Guidelines (WCAG) 2.1 AA standards.</li>
					<li>Our website is compatible with popular screen readers and assistive technologies.</li>
					<li>We provide alternative text for all relevant images to ensure they can be understood by screen readers.</li>
					<li>We use appropriate color contrast to make content readable.</li>
					<li>We have designed our navigation and structure to be logical and consistent.</li>
				</ul>

				<h2 id="feedback-and-assistance">Feedback and Assistance</h2>
				<p>If you encounter any accessibility barriers on our website or have suggestions on how we can improve accessibility, please let us know by contacting us at <a href="mailto:in2itchicago@gmail.com">in2itchicago@gmail.com</a>. We appreciate your feedback and will make every effort to address your concerns.</p>

				<h2 id="accessibility-assistance">Accessibility Assistance</h2>
				<p>If you need assistance or have any questions regarding the accessibility of our website, please contact us at <a href="mailto:in2itchicago@gmail.com">in2itchicago@gmail.com</a>. Our team is here to assist you.</p>

				<h2 id="third-party-content">Third-Party Content</h2>
				<p>Some content on our website may be provided by third parties. We are actively working with these providers to ensure their content is accessible.</p>

				<h2 id="ongoing-improvement">Ongoing Improvement</h2>
				<p>We are committed to regular accessibility audits and continuous improvement to make our website as accessible as possible. We strive to provide an inclusive online experience for all users.</p>

				<h2 id="accessibility-standards">Accessibility Standards</h2>
				<p>We aim to meet or exceed the WCAG 2.1 AA standards. These guidelines explain how to make web content more accessible for people with disabilities. Conformance with these guidelines will help make the web more user-friendly for everyone.</p>

				<h2 id="additional-resources">Additional Resources</h2>
				<ul>
					<li>
						<a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank">Web Content Accessibility Guidelines (WCAG) Overview</a>
					</li>
				</ul>
			</div>
			<div class="col-md-4 col-sm-12 d-none d-lg-block">
				<Accessibility-Contents></Accessibility-Contents>
			</div>
		</div>
	</div>
</template>

<style>
	.info-background{
		display:flex;
		height:25vh;
		max-height:250px;
		background: url('~/assets/img/home-background.png');
		background-size:cover;
		align-items:flex-start;
		justify-content:center;
		padding-bottom:80px;
	}
</style>