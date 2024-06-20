/**
 * Interface defining methods for user service operations.
 */
export interface IUserService {
	/**
	 * Deducts a specified amount from a user's balance.
	 *
	 * @param {number} userId - The ID of the user whose balance is to be deducted.
	 * @param {number} amount - The amount to deduct from the user's balance.
	 * @returns {Promise<User>} The updated user object after balance deduction.
	 * @throws {Error} If the user does not exist or if there is insufficient balance.
	 */
	deductBalance(
		userId: number,
		amount: number,
	): Promise<AmountDeductionResponse>;

	/**
	 * Creates a new user record in the database.
	 *
	 * @returns {Promise<User>} The newly created user object.
	 * @throws {Error} If there is an error during the user creation process.
	 */
	createUser(): Promise<User>;
}

/**
 * Interface defining the structure of query parameters for amount deduction request.
 */
export interface UsersAmountDeductionQuery {
	user_id: number; // The ID of the user whose balance will be deducted.
	amount: number; // The amount to deduct from the user's balance.
}

/**
 * Interface defining the structure of a user object.
 */
export interface User {
	id: number; // The unique identifier of the user.
	balance: number; // The current balance of the user.
}

/**
 * Interface defining the structure of a response after deducting balance from a user.
 * Extends User interface with an additional message property.
 */
export interface AmountDeductionResponse {
	message: string; // A descriptive message indicating the result of the balance deduction operation.
}
