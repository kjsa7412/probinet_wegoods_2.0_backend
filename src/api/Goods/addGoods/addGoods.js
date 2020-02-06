import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addGoods: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { files, title, description, supportId, supportPercent } = args;

      const goods = await prisma.createGoods({
        files: { set: files },
        title,
        description,
        support: {
          connect: supportId
        },
        supportPercent,
        user: { connect: { id: user.id } }
      });

      return goods;
    }
  }
};
