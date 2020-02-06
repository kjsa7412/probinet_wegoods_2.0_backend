import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeOneGoods: async (_, args) => {
      const { id } = args;
      return prisma.goods({ id });
    }
  }
};
