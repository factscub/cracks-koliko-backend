import { RouteShorthandOptions } from "fastify";

/**
 * Schema definition for the query string parameters used in the 'getItems' endpoint.
 */
const getItemsQueryStringSchema = {
	type: "object",
	properties: {
		app_id: { type: "string" },
		currency: { type: "string" },
	},
};

/**
 * Route shorthand options defining the schema for the 'getItems' endpoint.
 */
export const itemsSchema: RouteShorthandOptions = {
	schema: {
		querystring: getItemsQueryStringSchema,
	},
};
