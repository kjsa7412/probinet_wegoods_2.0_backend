import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeOneSupport: async (_, args) => {
      const { id } = args;
      return prisma.support({ id });
    }
  }
};
