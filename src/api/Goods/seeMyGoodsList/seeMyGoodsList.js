import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeMyGoodsList: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.user({ id: user.id }).goodses({ orderBy: "createdAt_DESC" });
    }
  }
};
