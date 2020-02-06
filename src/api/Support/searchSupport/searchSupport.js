import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchSupport: async (_, args) =>
      prisma.supports({
        where: {
          title_contains: args.term
        }
      })
  }
};
