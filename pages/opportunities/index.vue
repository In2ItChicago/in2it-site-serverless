<template>
	<div class="container">
		<h1>Current Opportunities</h1>
		<Search-Result-Opportunity-Card v-for="opportunity in opportunityData.list" :opportunity="opportunity"></Search-Result-Opportunity-Card>
	</div>
</template>

<script setup>
	import { getDocs, where, query, orderBy, collection } from "firebase/firestore";
	const db = useFirestore();

	const opportunityData = reactive({
		list: [], 
		isEmpty: false,
		isLoading: true
	});

	let approvedOrgUids = [];
	const approvedOrgsRef = collection(db, 'approved_org_uids');
	const approvedOrgsSnapshot = await getDocs(approvedOrgsRef);
	approvedOrgsSnapshot.forEach((doc) => {
		approvedOrgUids.push(doc.id);
	});

	const opportunitiesQuery = query(collection(db, "opportunities"), where('submitterUid', 'in', approvedOrgUids), orderBy('submittedAt', 'desc'));
	const snapshot = await getDocs(opportunitiesQuery);
	snapshot.forEach((doc) => {
		let data = doc.data();
		data.documentId = doc.id;
		opportunityData.list.push(data);
		opportunityData.isLoading = false;
	});
</script>