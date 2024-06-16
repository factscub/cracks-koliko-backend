import Fastify from "fastify";
import dotEnv from "dotenv";
dotEnv.config();
import registerPlugins from "./src/plugins";

const app = Fastify({ logger: true });

registerPlugins(app);

export default app;
