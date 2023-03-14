<template>
	<div class="page-title-container">
		<h1 class="page-title">Make an impact in your</h1>
		<span class="slidingVertical page-sliding-title">
			<span> Neighborhood</span>
			<span> Community</span>
			<span> City</span>
		</span>
	</div>
	<h2 class="page-tagline mt-3">Find ways to get involved, contribute your skills, make a difference in Chicagoland.</h2>
</template>

<style>
	.page-title-container{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	/*Vertical Sliding*/
	.slidingVertical{
		display:flex;
		width:260px;
		margin-top:-70px;
	}
	.slidingVertical span{
		display:flex;
		animation: topToBottom 9s linear infinite 0s;
		-ms-animation: topToBottom 9s linear infinite 0s;
		-webkit-animation: topToBottom 9s linear infinite 0s;
		color: #CF560A;
		opacity: 0;
		overflow: hidden;
		position: absolute;
		margin-left:8px;
	}
	.slidingVertical span:nth-child(2){
		animation-delay: 3s;
		-ms-animation-delay: 3s;
		-webkit-animation-delay: 3s;
	}
	.slidingVertical span:nth-child(3){
		animation-delay: 6s;
		-ms-animation-delay: 6s;
		-webkit-animation-delay: 6s;
	}

	.page-sliding-title{
		font-size:42px;
	}

	.page-tagline{
		text-align: left;
		font-weight: 400;
		font-size:26px;
		margin:0px;
		color:#034A57;
	}

	/*topToBottom Animation*/
	@keyframes topToBottom {
		0% { opacity: 0; }
		5% { opacity: 0; }
		15% { opacity: 1; }
		35% { opacity: 1; }
		45% { opacity: 0; }
		100% { opacity: 0; }
	}
	@-moz-keyframes topToBottom{
		0% { opacity: 0; }
		5% { opacity: 0; }
		15% { opacity: 1; }
		35% { opacity: 1; }
		45% { opacity: 0; }
		100% { opacity: 0; }
	}
	@-webkit-keyframes topToBottom{
		0% { opacity: 0; }
		5% { opacity: 0; }
		15% { opacity: 1; }
		35% { opacity: 1; }
		45% { opacity: 0; }
		100% { opacity: 0; }
	}
	@-ms-keyframes topToBottom{
		0% { opacity: 0; }
		5% { opacity: 0; }
		15% { opacity: 1; }
		35% { opacity: 1; }
		45% { opacity: 0; }
		100% { opacity: 0; }
	}
	@media (max-width: 768px) {
		.page-title-container{
			margin-left: 10px;
			margin-right: 10px;
		}
		.page-title, .page-sliding-title{
			font-size: 20px;
		}
		.page-tagline{
			font-size: 17px;
		}
		
		.slidingVertical{
			width:200px;
			margin-top:-39px;
		}
	}
	@media (min-width: 769px) and (max-width: 991px) {
		.page-title, .page-sliding-title{
			font-size: 32px;
		}
		.page-tagline{
			font-size: 25px;
		}
		.slidingVertical{
			margin-top:-58px;
		}
	}
</style>
