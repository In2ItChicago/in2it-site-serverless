// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
	const user = await getCurrentUser()

	console.log('middleware, user', user);

	// redirect the user to the login page
	if (!user) {
		console.log('no user');
		return navigateTo({
			path: '/auth/login',
			query: {
				redirect: to.fullPath,
			},
		})
	}
})