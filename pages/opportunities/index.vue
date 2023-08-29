<template>
	<div class="container">
		<h1>Current Opportunities</h1>
		<Search-Result-Opportunity-Card v-for="opportunity in opportunityData.list" :opportunity="opportunity"></Search-Result-Opportunity-Card>
	</div>
</template>

<script setup>
	import { getDocs, collection } from "firebase/firestore";
	const db = useFirestore();

	const opportunityData = reactive({
		list: [], 
		isEmpty: false,
		isLoading: true
	});

	const querySnapshot = await getDocs(collection(db, "opportunities"));
	querySnapshot.forEach((doc) => {
		let data = doc.data();
		data.documentId = doc.id;
		opportunityData.list.push(data);
		opportunityData.isLoading = false;
	});
</script>