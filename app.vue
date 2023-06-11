<template>
  <div>
	<Header/>
    <NuxtPage/>
	<SiteFooter/>
  </div>
</template>

<script setup>
	const router = useRouter()
	const route = useRoute()
	const user = useCurrentUser()

	// we don't need this watcher on server
	onMounted(() => {
		watch(user, (user, prevUser) => {
			console.log('user update', user, prevUser);
			if (prevUser && !user) {
				// user logged out
				console.log('user logged out');
				router.push('/auth/login')
			} else if (user && typeof route.query.redirect === 'string') {
				// user logged in
				console.log('user logged in, query', route.query.redirect);
				router.push(route.query.redirect)
			}
		})
	})
</script>