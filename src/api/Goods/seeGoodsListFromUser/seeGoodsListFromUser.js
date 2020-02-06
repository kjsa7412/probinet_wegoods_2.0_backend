import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeGoodsListFromUser: async (_, args) => {
      const { userId } = args;
      return prisma.goodses({ where: { user: { id: userId } } });
    }
  }
};
