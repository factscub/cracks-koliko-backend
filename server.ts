import app from "./app";

const start = async () => {
	try {
		const port = parseInt(process.env.SERVER_PORT || "3000", 10);
		const address = await app.listen({ port });
		app.log.info(`Server is running at ${address}`);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();
