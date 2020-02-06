import { prisma } from "../../../../generated/prisma-client";
import typeDef from "../../../../typeDef";

export default {
  Query: {
    seeAllStar: async (_, __) => {
      const allStars = await prisma.stars({
        where: { registed: true },
        orderBy: "name_ASC"
      });

      if (allStars.length !== 0) {
        return allStars;
      } else {
        return null;
      }
    }
  }
};
