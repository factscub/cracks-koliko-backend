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

		try {
			await client.query("BEGIN");

			// Retrieve user's current balance with FOR UPDATE to lock the row
			const userResult = await client.query(
				"SELECT balance FROM users WHERE id = $1 FOR UPDATE",
				[userId],
			);
			if (userResult.rows.length === 0) {
				throw new Error(`User with id ${userId} not found.`);
			}
			const currentBalance = userResult.rows[0].balance;

			// Check if user has sufficient balance
			if (currentBalance < amount) {
				throw new Error(`Insufficient balance for user with id ${userId}.`);
			}

			// Calculate new balance
			const newBalance = currentBalance - amount;

			// Update user's balance
			await client.query("UPDATE users SET balance = $1 WHERE id = $2", [
				newBalance,
				userId,
			]);

			// Commit transaction
			await client.query("COMMIT");

			return {
				message: `Successfully deducted $${amount} from user with id ${userId}.Old balance: $${currentBalance}. New balance: $${newBalance.toFixed(2)}`,
			};
		} catch (error) {
			// Rollback transaction on error
			await client.query("ROLLBACK");			
			throw error; // Re-throw the error for handling in calling code
		} finally {
			client.release();
		}
	}
}

export default UserService;
