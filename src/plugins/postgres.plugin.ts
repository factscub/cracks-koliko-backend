import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import fastifyPostgres from "@fastify/postgres";
import { postgresConfig } from "../config/postgres.config";

/**
 * Plugin to connect to a PostgreSQL database.
 * This plugin registers PostgreSQL client with Fastify instance using provided configuration.
 * It logs successful connection or errors during connection attempts.
 * @param fastify - FastifyInstance to register the plugin
 */
const postgresPlugin = async (fastify: FastifyInstance) => {
	try {
		// Register fastify-postgres plugin with provided configuration
		await fastify.register(fastifyPostgres, postgresConfig);

		fastify.log.info("Connected to PostgreSQL database");

		// Perform database initialization (create tables etc.)
		await initializeDatabase(); // Function to initialize database schema

		fastify.log.info("Database initialized");
	} catch (err) {
		// Log error if connection to PostgreSQL fails
		fastify.log.error("Error connecting to PostgreSQL:", err);
		throw err;
	}

	/**
	 * Function to initialize database schema if tables don't exist
	 */
	async function initializeDatabase() {
		const client = await fastify.pg.connect();

		try {
			// Example: Create users table if it doesn't exist
			await client.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    balance DECIMAL(10, 2) DEFAULT 10000
                );
            `);
		} finally {
			client.release();
		}
	}
};

// Export the plugin wrapped with fastify-plugin for ease of registration
export default fp(postgresPlugin);
