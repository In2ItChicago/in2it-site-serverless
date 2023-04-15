export default defineEventHandler(async ({ context }) => {
	const obj = await context.env.in2it_bucket.get('events');
	return {
		res: obj
	}
});