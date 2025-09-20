import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import registerAchievementRoutes from "../../../../../modules/achievements/http/routes";
import registerClubRoutes from "../../../../../modules/clubs/http/routes";
import registerHistoryRoutes from "../../../../../modules/histories/http/routes";
import registerPlayerRoutes from "../../../../../modules/players/http/routes";
import registerPostRoutes from "../../../../../modules/posts/http/routes";
import registerSeasonRoutes from "../../../../../modules/seasons/http/routes";
import registerStaffRoutes from "../../../../../modules/staff/http/routes";
import registerTeamRoutes from "../../../../../modules/teams/http/routes";
import registerUserRoutes from "../../../../../modules/users/http/routes";

async function registerAllRoutes(fastify: FastifyInstance) {
  await fastify.register(registerAchievementRoutes, {
    prefix: "/achievements",
  });
  await fastify.register(registerClubRoutes, { prefix: "/clubs" });
  await fastify.register(registerHistoryRoutes, { prefix: "/histories" });
  await fastify.register(registerPlayerRoutes, { prefix: "/players" });
  await fastify.register(registerPostRoutes, { prefix: "/posts" });
  await fastify.register(registerSeasonRoutes, { prefix: "/seasons" });
  await fastify.register(registerStaffRoutes, { prefix: "/staff" });
  await fastify.register(registerTeamRoutes, { prefix: "/teams" });
  await fastify.register(registerUserRoutes, { prefix: "/users" });
}

export default fp(registerAllRoutes, { name: "registerAllRoutes" });
