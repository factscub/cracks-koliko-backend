import axios from "axios";
import { AppId, Currency, Item, IItemsService } from "./items";

/**
 * Service class to interact with the Skinport API and fetch items.
 */
export class ItemsService implements IItemsService {
	async getItems(app_id: AppId, currency: Currency): Promise<Item[]> {
		{
			// Make API request to Skinport
			const response = await axios(`https://api.skinport.com/v1/items`, {
				params: {
					app_id,
					currency,
				},
			});

			// Check if API request was successful
			if (response.status !== 200) {
				throw new Error(
					`Failed to fetch items: ${response.status} ${response.statusText}`,
				);
			}

			// Extract items from API response
			const items = response.data as Item[];

			if (items.length) {
				// Process items and compute additional fields
				return items.map((item) => ({
					...item,
					min_tradable_price: item.min_price,
					min_non_tradable_price: item.min_price + 10,
				}));
			}

			return [];
		}
	}
}
