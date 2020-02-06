import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeComments: async (_, args) => {
      const { goodsId, postId, supportId } = args;

      if (goodsId !== undefined && goodsId !== "") {
        return prisma.comments({ where: { goods: { id: goodsId } } });
      } else if (postId !== undefined && postId !== "") {
        return prisma.comments({ where: { post: { id: postId } } });
      } else if (supportId !== undefined && supportId !== "") {
        return prisma.comments({ where: { support: { id: supportId } } });
      } else {
        throw Error("You can't do that. Empty ID.");
      }
    }
  }
};
