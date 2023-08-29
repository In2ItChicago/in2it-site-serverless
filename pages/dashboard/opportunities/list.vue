<template>
	<div class="container-fluid">
		<div class="row flex-nowrap">
			<Dashboard-Sidebar></Dashboard-Sidebar>
			<div class="col py-3">
				<h1>My Opportunities</h1>
				<div v-if="opportunityData.isLoading">
					<div class="spinner-border mt-3" role="status" style="color: #034a57; width: 100px; height: 100px;">
						<span class="visually-hidden">Loading...</span>
					</div>
				</div>
				<div class="opportunity-container mt-2 row" v-else>
					<Dashboard-Opportunity-Card v-for="opportunity in opportunityData.list" :opportunity="opportunity">
					</Dashboard-Opportunity-Card>
				</div>
				<div class="opportunity-container mt-2 row" v-if="opportunityData.isEmpty">
					<!-- CTA to submit event -->
					<div class="col-sm-12 col-md-6 col-lg-3">
						<div class="card my-3 p-2 blank-opportunity-card">
							<h2 class="prompt-title">Add your first opportunity</h2>
							<img class="my-5" src="/img/icons/calendar-plus.svg" width="100" height="100">
							<a href="/dashboard/opportunities/add" class="btn btn-primary first-opportunity-button mt-2">Add New</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { getAuth } from "firebase/auth";
	import { getDocs, query, where, collection } from "firebase/firestore";
	const db = useFirestore();

	definePageMeta({
		middleware: ['auth'],
	});

	const opportunityData = reactive({
		list: [], 
		isEmpty: false,
		isLoading: true
	});

	onMounted(async () => {
		const auth = getAuth();
		console.log('our uid is', auth.currentUser.uid);

		opportunityData.list = [];
		console.log('cleared opportunities list');

		const opportunitiesRef = collection(db, "opportunities");
		const q = query(opportunitiesRef, where("submitterUid", "==", auth.currentUser.uid));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			let data = doc.data();
			data.documentId = doc.id;
			opportunityData.list.push(data);

			opportunityData.isLoading = false;
		});

		if (querySnapshot.empty) {
			opportunityData.isLoading = false;
			opportunityData.isEmpty = true;
		}
	});
</script>

<style>
	.opportunity-container{
		display:flex;
		flex-direction:row;
	}

	.blank-opportunity-card{
		display:flex;
		flex-direction: column;
		align-items: center;
		border-radius:0px;
		filter:drop-shadow(0px 4px 4px #00000040);
	}

	.prompt-title{
		font-size:30px;
		text-align: center;
	}

	.first-opportunity-button{
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

	.first-opportunity-button:hover, .first-opportunity-button:active, .first-opportunity-button:focus{
		background-color:#0a5850;
	}
</style>