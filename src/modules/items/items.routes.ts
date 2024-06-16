import { FastifyInstance } from "fastify";
import ItemsController from "./items.controller";
import { itemsSchema } from "./items.schema";

/**
 * Configure routes related to items management.
 * @param fastify - The FastifyInstance to register the routes.
 */
const itemsRoute = async (fastify: FastifyInstance) => {
	// Create an instance of ItemsController to handle item-related operations
	const itemsController = new ItemsController(fastify);

	// Route to fetch all items
	fastify.get("/all", { schema: itemsSchema.schema }, itemsController.getItems);
};

export default itemsRoute;
