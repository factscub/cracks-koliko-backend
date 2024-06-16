import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { UsersAmountDeductionQuery } from "./user";
import UserService from "./user.service";

/**
 * Controller class handling user-related HTTP requests.
 */
export default class UserController {
	private readonly userService: UserService;

	/**
	 * Creates an instance of UserController.
	 *
	 * @param {FastifyInstance} fastify - The FastifyInstance to access Fastify resources.
	 */
	constructor(private readonly fastify: FastifyInstance) {
		this.userService = new UserService(this.fastify.pg);

		// Bind methods to ensure correct 'this' context
		this.deductBalance = this.deductBalance.bind(this);
		this.createUser = this.createUser.bind(this);
	}

	/**
	 * Handler for creating a new user.
	 *
	 * @param {FastifyRequest} request - The Fastify request object.
	 * @param {FastifyReply} reply - The Fastify reply object.
	 * @returns {Promise<never>}
	 */
	async createUser(
		request: FastifyRequest,
		reply: FastifyReply,
	): Promise<never> {
		const result = await this.userService.createUser();
		return reply.send(result);
	}

	/**
	 * Handler for deducting balance from a user's account.
	 *
	 * @param {FastifyRequest<{ Querystring: UsersAmountDeductionQuery }>} request - The Fastify request object with query parameters.
	 * @param {FastifyReply} reply - The Fastify reply object.
	 * @returns {Promise<never>}
	 */
	async deductBalance(
		request: FastifyRequest<{ Querystring: UsersAmountDeductionQuery }>,
		reply: FastifyReply,
	): Promise<never> {
		const { user_id, amount } = request.query;
		const result = await this.userService.deductBalance(user_id, amount);
		return reply.send(result);
	}
}
