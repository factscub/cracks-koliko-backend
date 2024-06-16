import { FastifyInstance } from "fastify";
import UserController from "./user.controller";
import { userAmountDeductionSchema, createUserSchema } from "./user.schema";

/**
 * Defines Fastify routes for user management operations.
 *
 * @param {FastifyInstance} fastify - The FastifyInstance to register routes.
 */
const usersRoutes = async (fastify: FastifyInstance) => {
	// Create a new instance of UserController
	const userController = new UserController(fastify);

	// Route for creating a new user
	fastify.get(
		"/create-user",
		{ schema: createUserSchema.schema },
		userController.createUser,
	);

	// Route for deducting user balance
	fastify.get(
		"/deduct-balance",
		{ schema: userAmountDeductionSchema.schema },
		userController.deductBalance,
	);
};

export default usersRoutes;
