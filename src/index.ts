import { Elysia } from "elysia";
import creditDb from "./db/connection";
import { TCreditInfo } from "./interfaces/credit";
import { getBalanceByCustomerId, getCreditByCustomerId, initialCredit } from "./services/credit";
import { creditInfoModel } from "./db/model";

const app = new Elysia();
const PORT = process.env.PORT!;

app.guard(
	{
		beforeHandle({ set, headers }) {
			if (!headers.authorization) return (set.status = "Unauthorized");
		},
	},
	(app) => {
		return app.group("/api/v1/credit", (router) => {
			return router
				.get("/", () => "Hello credit service")
				.get("/:customerId", async ({ set, params }) => {
					const customerId = params.customerId;
					const response = await getCreditByCustomerId(+customerId);
					set.status = response.status;
					return response;
				})
				.get("/balance/:customerId", async ({ set, params }) => {
					const customerId = params.customerId;
					const response = await getBalanceByCustomerId(+customerId);
					set.status = response.status;
					return response;
				})
				.post("/init", async ({ set, body }) => {
					const payload = body as TCreditInfo;
					const response = await initialCredit(payload.customerId, payload.cardHolderName);
					set.status = response.status;
					return response;
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

