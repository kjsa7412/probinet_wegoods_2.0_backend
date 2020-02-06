import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchKind: async (_, args) => {
      const { term } = args;

      if (term.length !== 0) {
        return prisma.kinds({
          where: {
            text_contains: term,
            registed: true
          }
        });
      } else {
        throw Error("You can't do that");
      }
    }
  }
};
