import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function guessRoutes(fastify: FastifyInstance) {
  fastify.get("/guesses/count", async (request, reply) => {
    const count = await prisma.guess.count();

    return { count };
  });

  fastify.post(
    "/pools/:poolId/games/:gameId/guesses",
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
      const createGuessParams = z.object({
        poolId: z.string(),
        gameId: z.string(),
      });
      const createGuessBody = z.object({
        firstTeamPoints: z.number(),
        secondTeamPoints: z.number(),
      });
      const { poolId, gameId } = createGuessParams.parse(request.params);
      const { firstTeamPoints, secondTeamPoints } = createGuessBody.parse(
        request.body,
      );

      const participant = await prisma.participant.findUnique({
        where: {
          userId_poolId: {
            poolId,
            userId: request.user.sub,
          },
        },
      });

      if (!participant) {
        return reply.status(404).send({
          message: "You are not a participant of this pool",
        });
      }
      const guess = await prisma.guess.findUnique({
        where: {
          participantId_gameId: {
            gameId,
            participantId: participant.id,
          },
        },
      });
      if (guess) {
        return reply.status(409).send({
          message: "You already made a guess for this game",
        });
      }
      const game = await prisma.game.findFirst({
        where: {
          id: gameId,
        },
      });
      if (!game) {
        return reply.status(404).send({
          message: "Game not found",
        });
      }
      if (game.date < new Date()) {
        return reply.status(409).send({
          message: "Game already started!",
        });
      }

      await prisma.guess.create({
        data: {
          gameId,
          participantId: participant.id,
          firstTeamPoints,
          secondTeamPoints,
        },
      });

      return reply.status(201).send();
    },
  );
}
