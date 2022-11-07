/* eslint-disable camelcase */
"use strict";
const __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const PORT = 3000;
async function bootstrap() {
  const fastify = (0, fastify_1.default)({
    logger: true,
  });
  fastify.get("/pools/count", (request, reply) => {
    return { count: 123 };
  });
  await fastify.listen({ port: PORT });
}
bootstrap();
