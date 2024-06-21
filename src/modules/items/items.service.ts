import axios from "axios";
import {
	AppId,
	Currency,
	Item,
	IItemsService,
	SkinportResponse,
} from "./items";

/**
 * Service class to interact with the Skinport API and fetch items.
 */
export class ItemsService implements IItemsService {
	async getItems(app_id: AppId, currency: Currency): Promise<Item[]> {
		{
			// Make API requests to Skinport
			const skinportApi = "https://api.skinport.com/v1/items";
			const tradable_data = axios(skinportApi, {
				params: {
					app_id,
					currency,
					tradable: 0,
				},
			});

			const non_tradable_data = axios(skinportApi, {
				params: {
					app_id,
					currency,
					tradable: 1,
				},
			});

			const [res_1, res_2] = await Promise.all([
				tradable_data,
				non_tradable_data,
			]);

			if (Array.isArray(res_1.data) && Array.isArray(res_2.data)) {
				return res_1.data.map(
					(tradableItem: SkinportResponse, index: number): Item => {
						const nonTradableItem = res_2.data[index];
						return {
							name: tradableItem.market_hash_name,
							min_prices: {
								tradable_price: tradableItem.min_price,
								non_tradable_price: nonTradableItem.min_price,
							},
						};
					},
				);
			}

			return [];
		}
	}
}
