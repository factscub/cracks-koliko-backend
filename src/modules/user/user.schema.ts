import { RouteShorthandOptions } from "fastify";

// Schema for the response when a user is created
const userCreatedResSchema = {
	200: {
		type: "object",
		properties: {
			id: { type: "number" },
			balance: { type: "number" },
		},
	},
};

// Schema for query parameters when deducting money from a user
const deductMoneyQueryStringSchema = {
	type: "object",
	properties: {
		user_id: { type: "number" },
		amount: { type: "number" },
	},
	required: ["user_id", "amount"],
};

// Schema for the response when money is deducted from a user
const deductMoneyResSchema = {
	200: {
		type: "object",
		properties: {
			id: { type: "number" },
			balance: { type: "number" },
			message: { type: "string" },
		},
	},
};

// Route shorthand options for creating a user endpoint
export const createUserSchema: RouteShorthandOptions = {
	schema: {
		response: userCreatedResSchema,
	},
};

// Route shorthand options for deducting money endpoint
export const userAmountDeductionSchema: RouteShorthandOptions = {
	schema: {
		querystring: deductMoneyQueryStringSchema,
		response: deductMoneyResSchema,
	},
};
