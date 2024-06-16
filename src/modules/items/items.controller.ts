import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import { ItemsQuery } from "./items";
import CachingItemsService from "./items.cache.service";

/**
 * Controller class handling items-related HTTP requests.
 */
export default class ItemsController {
	/**
	 * Service instance responsible for caching items.
	 */
	private readonly cachingitemsService = new CachingItemsService(
		this.fastify.redis,
	);

	/**
	 * Constructor to initialize the ItemsController with FastifyInstance.
	 * Binds 'getItems' method to the class instance for proper function scope.
	 * @param fastify FastifyInstance - The instance of Fastify used to register routes.
	 */
	constructor(private readonly fastify: FastifyInstance) {
		this.getItems = this.getItems.bind(this);
	}

	/**
	 * Handler for retrieving items based on query parameters.
	 * @param request FastifyRequest<{ Querystring: ItemsQuery }> - The Fastify request object containing query parameters.
	 * @param reply FastifyReply - The Fastify reply object to send the response.
	 * @returns Promise<never> - Indicates that the handler does not return a value directly.
	 */
	async getItems(
		request: FastifyRequest<{ Querystring: ItemsQuery }>,
		reply: FastifyReply,
	): Promise<never> {
		const { app_id, currency } = request.query;

		// Fetch items from the caching service based on app_id and currency
		const items = await this.cachingitemsService.getItems(app_id, currency);

		// Send the fetched items as the HTTP response
		return reply.send(items);
	}
}
