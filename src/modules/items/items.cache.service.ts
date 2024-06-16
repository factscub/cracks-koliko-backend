import { AppId, Currency, IItemsService, Item } from "./items";
import { ItemsService } from "./items.service";
import { FastifyRedis } from "@fastify/redis";

/**
 * CachingItemsService class implements ItemsService interface and provides caching functionality for item retrieval.
 * It caches items fetched from a remote service using Redis for efficient subsequent retrievals.
 */
export default class CachingItemsService implements IItemsService {
	private readonly itemsService = new ItemsService(); // Instance of ItemsService for fetching items
	private readonly CACHE_TTL = 30 * 60; // Cache TTL (time-to-live) in seconds, set to 30 minutes

	/**
	 * Constructs an instance of CachingItemsService.
	 * @param redisClient FastifyRedis - Fastify Redis client instance for caching.
	 */
	constructor(private readonly redisClient: FastifyRedis) {}

	async getItems(
		app_id: AppId = "730",
		currency: Currency = "EUR",
	): Promise<Item[]> {
		const cacheKey = `items:${app_id}:${currency}`;
		let items: Item[] = [];

		// Attempt to fetch items from cache
		const cachedItems = await this.redisClient.get(cacheKey);
		if (cachedItems) {
			items = JSON.parse(cachedItems);
			console.log(
				`------- USING CACHED ITEMS DATA FOR THE KEY: ${cacheKey} ------`,
			);
		} else {
			// Fetch items from remote service if not found in cache
			items = await this.itemsService.getItems(app_id, currency);

			// Cache the fetched items with specified TTL
			await this.redisClient.set(
				cacheKey,
				JSON.stringify(items),
				"EX", // Set expiration using EX (seconds)
				this.CACHE_TTL,
			);

			console.log(
				`-------------- FETCHED AND CACHED ITEMS DATA FOR THE KEY: ${cacheKey} -----------------`,
			);
		}

		return items;
	}
}
