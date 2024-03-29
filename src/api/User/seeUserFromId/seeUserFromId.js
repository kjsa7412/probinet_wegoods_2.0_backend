import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUserFromId: async (_, args) => {
      const { id } = args;
      return prisma.user({ id });
    }
  }
};
