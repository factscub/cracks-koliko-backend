import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import redis from "@fastify/redis";
import { redisConfig } from "../config/redis.config";

/**
 * Plugin to connect to a Redis database.
 * This plugin registers Redis client with Fastify instance using provided configuration.
 * It logs successful connection or errors during connection attempts.
 * @param fastify - FastifyInstance to register the plugin
 */
const redisPlugin = async (fastify: FastifyInstance) => {
	try {
		// Register Redis plugin with provided configuration
		await fastify.register(redis, redisConfig);
		fastify.log.info("Connected to Redis database");
	} catch (err) {
		// Log error if connection to Redis fails
		fastify.log.error("Error connecting to Redis:", err);
		throw err;
	}
};

// Export the plugin wrapped with fastify-plugin for ease of registration
export default fp(redisPlugin);
