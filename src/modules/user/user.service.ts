import { PostgresDb } from "@fastify/postgres";
import { AmountDeductionResponse, IUserService, User } from "./user";

/**
 * Service class implementing IUserService for user-related operations.
 */
class UserService implements IUserService {
	/**
	 * Creates an instance of UserService.
	 *
	 * @param {PostgresDb} postresClient - The PostgreSQL client instance.
	 */
	constructor(private readonly postresClient: PostgresDb) {}

	async createUser(): Promise<User> {
		const client = await this.postresClient.connect();
		const result = await client.query(
			"INSERT INTO users DEFAULT VALUES RETURNING *",
		);
		client.release();
		return result.rows[0];
	}

	async deductBalance(
		userId: number,
		amount: number,
	): Promise<AmountDeductionResponse> {
		const client = await this.postresClient.connect();

		// Retrieve user's current balance
		const userResult = await client.query(
			"SELECT balance FROM users WHERE id = $1",
			[userId],
		);

		if (userResult.rows.length === 0) {
			throw new Error("User not found");
		}

		const user = userResult.rows[0];

		// Check if user has sufficient balance
		if (user.balance < amount) {
			throw new Error("Insufficient balance");
		}

		// Calculate new balance after deduction
		const newBalance = user.balance - amount;

		// Update user's balance in the database
		const updatedData = await client.query(
			"UPDATE users SET balance = $1 WHERE id = $2 RETURNING *",
			[newBalance, userId],
		);

		client.release();
		return {
			message: "Amount deducted successfully!",
			...updatedData.rows[0],
		};
	}
}

export default UserService;
