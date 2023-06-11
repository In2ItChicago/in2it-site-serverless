<template>
	<div class="container">
		<div class="col-md-6">

			<h1>Submit Page</h1>

			<form @submit.prevent="submitForm" class="needs-validation" novalidate>
				<div class="mb-3">
					<label for="event-name" class="form-label">Event Name</label>
					<input type="text" id="event-name" v-model="event.name" class="form-control" required>
					<div class="invalid-feedback">
						Please enter the event name.
					</div>
				</div>

				<div class="mb-3">
					<label for="event-date" class="form-label">Event Date</label>
					<input type="date" id="event-date" v-model="event.date" class="form-control" required>
					<div class="invalid-feedback">
						Please enter a valid event date.
					</div>
				</div>

				<div class="mb-3">
					<label for="event-description" class="form-label">Event Description</label>
					<textarea id="event-description" v-model="event.description" class="form-control" required></textarea>
					<div class="invalid-feedback">
						Please enter the event description.
					</div>
				</div>

				<button type="submit" class="btn btn-primary">Submit Event</button>
			</form>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth'],
	});

	import { query, where, addDoc, collection } from "firebase/firestore";
	const db = useFirestore();

	let event = {
		name: '',
		date: '',
		description: ''
	};

	let submitForm = () => {
		console.log('we are submitting', event);

		//Create new event document
		addDoc(collection(db, "events"), event).then(docRef => {
			console.log('event submitted successfully!');
		});
	};
</script>