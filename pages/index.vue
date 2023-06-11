<template>
	<div class="in2it-home-background">
		<Opportunities-Form/>
	</div>

	<div class="container mt-4">
        <Impact-Message-Cycle/>
    </div>

	<div class="container mt-5">
		<h2 class="page-title">Featured Events</h2>
		<div class="featured-event-container mt-2 row">
			<Event-Card/>
			<Event-Card/>
			<Event-Card/>
			<Event-Card/>
		</div>

		<div class="row d-flex">
			<div class="col d-flex justify-content-end">
				<a class="view-all-events-link" href="#">View All Events &rarr;</a>
			</div>
		</div>
	</div>
</template>

<style>
	.in2it-home-background{
		display:flex;
		height:50vh;
		background: url('~/assets/img/home-background.png');
		background-size:cover;
		align-items:flex-end;
		justify-content:center;
		padding-bottom:80px;
	}

	.featured-event-container{
		display:flex;
		flex-direction:row;
	}

	.page-title{
		display:flex;
		font-weight: 500;
		white-space: nowrap;
		color:#034A57;
	}

	.view-all-events-link{
		display:flex;
		font-weight: 500;
		white-space: nowrap;
		color:#034A57;
		text-decoration: none;
		font-size:26px;
		margin-bottom: 20px;;
	}
</style>

<script setup>
	const isLoggedIn = await getCurrentUser()
	console.log('isLoggedIn', isLoggedIn);

	//List all Documents
	/* const db = useFirestore();
	import { getDocs, collection } from "firebase/firestore";
	const querySnapshot = await getDocs(collection(db, "events"));
	querySnapshot.forEach((doc) => {
		console.log(doc.id, JSON.stringify(doc.data()));
	}); */

	//Query Documents
	/* const eventsRef = collection(db, "events");
	const q = query(eventsRef, where("cost", ">", 0));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		console.log(doc.id, JSON.stringify(doc.data()));
	}); */

</script>