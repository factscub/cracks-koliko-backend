/**
 * Interface defining methods for fetching items based on app_id and currency.
 */
export interface IItemsService {
	/**
	 * Fetches items based on specified app_id and currency.
	 * @param app_id AppId - The ID of the application for which items are requested.
	 * @param currency Currency - The currency code indicating the currency of prices.
	 * @returns Promise<Item[] | null> - A promise resolving to an array of items or null if no items are found.
	 */
	getItems(app_id: AppId, currency: Currency): Promise<Item[]>;
}

/**
 * Type alias for representing the ID of an application.
 */
export type AppId = string;

/**
 * Type alias for representing supported currencies.
 */
export type Currency =
	| "AUD"
	| "BRL"
	| "CAD"
	| "CHF"
	| "CNY"
	| "CZK"
	| "DKK"
	| "EUR"
	| "GBP"
	| "HRK"
	| "NOK"
	| "PLN"
	| "RUB"
	| "SEK"
	| "TRY"
	| "USD";

/**
 * Interface representing the query parameters for fetching items.
 */
export interface ItemsQuery {
	app_id: AppId; // The ID of the application.
	currency: Currency; // The currency code.
}

/**
 * Interface representing an item.
 */
export interface Item {
	name: string;
	min_prices: {
		tradable_price: number; // Minimum tradeable price of the item.
		non_tradable_price: number; // Minimum non-tradeable price of the item.
	};
}

export interface SkinportResponse {
	market_hash_name: string; // Name or identifier of the item in the market.
	currency: string; // Currency code in which prices are denominated.
	suggested_price: number; // Suggested price of the item.
	item_page: string; // URL to the item's page.
	market_page: string; // URL to the item's market page.
	min_price: number; // Minimum price of the item.
	max_price: number; // Maximum price of the item.
	mean_price: number; // Mean price of the item.
	median_price: number; // Median price of the item.
	quantity: number; // Quantity of the item.
	created_at: number; // Timestamp when the item was created.
	updated_at: number; // Timestamp when the item was last updated.
}
