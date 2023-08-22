// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	pages:true,
	modules: [
		'nuxt-vuefire',
	],
	ssr: true,
	vuefire: {
		auth: true,
		config: {
			apiKey: process.env.FIREBASE_API_KEY,
			authDomain: process.env.FIREBASE_AUTH_DOMAIN,
			projectId: process.env.FIREBASE_PROJECT_ID,
			appId: process.env.FIREBASE_APP_ID,
			storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
			messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
			measurementId: process.env.FIREBASE_MEASUREMENT_ID
		},
	},
	routeRules: {
		'/auth/sign-out': {ssr: false}
	},
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			title: 'In2It',
			link: [
				{
					href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
					rel: 'stylesheet',
					integrity: 'sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC',
					crossorigin: 'anonymous'
				},
				{
					rel: 'preconnect',
					href: 'https://fonts.googleapis.com'
				},
				{
					rel: 'preconnect',
					href: 'https://fonts.gstatic.com'
				},
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap'
				},
			],
			script: [
				{
					src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
					integrity: 'sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM',
					crossorigin: 'anonymous'
				}
			]
		}
	},
	css: [
		'~/assets/css/styles.css'
	]
})
