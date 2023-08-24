<template>
	<div class="container-fluid">
		<div class="row flex-nowrap">
			<Dashboard-Sidebar></Dashboard-Sidebar>
			<div class="col py-3">
				<h1>My Opportunities</h1>
				<div v-if="eventData.isLoading">
					<div class="spinner-border mt-3" role="status" style="color: #034a57; width: 100px; height: 100px;">
						<span class="visually-hidden">Loading...</span>
					</div>
				</div>
				<div class="event-container mt-2 row" v-else>
					<Dashboard-Event-Card v-for="event in eventData.list" :event="event">
					</Dashboard-Event-Card>
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

	const eventData = reactive({
		list: [], 
		isLoading: true
	});

	onMounted(async () => {
		const auth = getAuth();
		console.log('our uid is', auth.currentUser.uid);

		eventData.list = [];
		console.log('cleared event list');

		const eventsRef = collection(db, "events");
		const q = query(eventsRef, where("orgUid", "==", auth.currentUser.uid));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, doc.data());
			eventData.list.push(doc.data());

			eventData.isLoading = false;

			console.log('events list', eventData.list);
		});
	});
</script>

<style>
	.event-container{
		display:flex;
		flex-direction:row;
	}
</style>