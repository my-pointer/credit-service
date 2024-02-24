import { Elysia } from "elysia";
import creditDb from "./db/connection";

const app = new Elysia();
const PORT = process.env.PORT!;

app.guard(
	{
		beforeHandle({ set, cookie: { accessToken } }) {
			if (!accessToken.value) return (set.status = "Unauthorized");
		},
	},
	(app) => {
		return app.group("/api/v1/credit", (router) => {
			return router
				.get("/", () => "Hello credit service")
				.get("/user/:userId", ({ set, params }) => {
					return "asd";
				});
		});
	}
);

app.listen(PORT, async () => {
	try {
		await creditDb.authenticate();
	} catch (error) {
		console.log(error);
	}
});

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

