import app from "./app";
import cluster from "cluster";
import numCPUs from "os";

const start = async () => {
	try {
		if (cluster.isPrimary) {
			console.log(`Master ${process.pid} is running`);

			// Fork workers
			for (let i = 0; i < numCPUs.cpus().length; i++) {
				cluster.fork();
			}

			cluster.on("exit", (worker, code, signal) => {
				console.log(`Worker ${worker.process.pid} died`);
				cluster.fork();
			});
		} else {
			const port = parseInt(process.env.SERVER_PORT || "3000", 10);
			const address = await app.listen({ port });
			app.log.info(`Server is running at ${address}`);
		}
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();
