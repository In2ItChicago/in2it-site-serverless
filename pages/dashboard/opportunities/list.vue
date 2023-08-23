<template>
	<div class="container-fluid">
		<div class="row flex-nowrap">
			<Dashboard-Sidebar></Dashboard-Sidebar>
			<div class="col py-3">
				<h1>My Opportunities</h1>
				<div class="container mt-5">
					<div class="event-container mt-2 row">
						<Dashboard-Event-Card v-for="event in events.list" :event="event">
						</Dashboard-Event-Card>
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

	const events = reactive({list: []});

	onMounted(async () => {
		const auth = getAuth();
		console.log('our uid is', auth.currentUser.uid);

		events.list = [];
		console.log('cleared event list');

		const eventsRef = collection(db, "events");
		const q = query(eventsRef, where("orgUid", "==", auth.currentUser.uid));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, doc.data());
			events.list.push(doc.data());

			console.log('events list', events.list);
		});
	});
</script>

<style>
	.event-container{
		display:flex;
		flex-direction:row;
	}
</style>