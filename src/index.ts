import { Elysia } from "elysia";

const app = new Elysia();
const PORT = process.env.PORT!;

app.guard(
	{
		beforeHandle({ set, cookie: { accessToken } }) {
			console.log(accessToken);
			if (!accessToken.value) {
				set.status = "Unauthorized";
				return { status: "Unauthorized" };
			}
		},
	},
	(app) => {
		return app.group("/api/v1/credit", (router) => {
			return router.get("/", () => "Hello credit service").get("/asd", () => ({ msg: "asd" }));
		});
	}
);

app.listen(PORT);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

