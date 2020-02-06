import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeRegistedStarList: async (_, __) =>
      prisma.stars({ where: { registed: true } })
  }
};
