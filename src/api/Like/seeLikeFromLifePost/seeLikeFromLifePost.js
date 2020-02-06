import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeLikeFromPost: async (_, args) => {
      const { postId, supportId } = args;

      if (postId !== "") {
        return prisma.likes({
          where: {
            post: { id: postId }
          }
        });
      } else if (supportId !== "") {
        return prisma.likes({
          where: {
            support: { id: supportId }
          }
        });
      } else {
        console.log("postId and supportId is null");
        return;
      }
    }
  }
};
