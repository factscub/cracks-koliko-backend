import { FastifyInstance } from "fastify";
import redisPlugin from "./redis.plugin";
import postgresPlugin from "./postgres.plugin";
import itemsRoutes from "../modules/items/items.routes";
import userRoutes from "../modules/user/user.routes";

/**
 * Registers plugins and routes with a FastifyInstance.
 * @param app - FastifyInstance to register plugins and routes.
 */
export default async function registerPlugins(
	app: FastifyInstance,
): Promise<void> {
	try {
		// Register Redis plugin
		await app.register(redisPlugin);
		app.log.info("Redis plugin registered successfully.");

		// Register PostgreSQL plugin
		await app.register(postgresPlugin);
		app.log.info("PostgreSQL plugin registered successfully.");

		// Register items routes with prefix /api/item
		await app.register(itemsRoutes, { prefix: "/api/items" });
		app.log.info("Items routes registered successfully.");

		// Register user routes with prefix /api/user
		await app.register(userRoutes, { prefix: "/api/user" });
		app.log.info("User routes registered successfully.");
	} catch (err) {
		app.log.error("Error registering plugins and routes:", err);
		throw err;
	}
}
