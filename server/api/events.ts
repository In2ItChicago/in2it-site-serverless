export default defineEventHandler(({ context }) => {
	return {
		res: context.cloudflare.env.in2it_bucket
	}
});