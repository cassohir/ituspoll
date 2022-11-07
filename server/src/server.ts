import Fastify from "fastify";

import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { z } from "zod";

import ShortUniqueId from "short-unique-id";
import { poolRoutes } from "./routes/pool";
import { userRoutes } from "./routes/user";
import { gameRoutes } from "./routes/game";
import { authRoutes } from "./routes/auth";
import { guessRoutes } from "./routes/guess";

const PORT = 3333;

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  // Em produção tem que estar em variáveis de ambiente;

  await fastify.register(jwt, {
    secret: "RachaCopa",
  });

  await fastify.register(poolRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(authRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(userRoutes);

  await fastify.listen({ port: PORT, host: "0.0.0.0" });
}
bootstrap();
