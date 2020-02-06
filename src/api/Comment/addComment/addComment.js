import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, goodsId, postId, supportId } = args;
      const { user } = request;

      if (goodsId !== undefined && goodsId !== "") {
        return await prisma.createComment({
          user: {
            connect: {
              id: user.id
            }
          },
          goods: {
            connect: {
              id: goodsId
            }
          },
          text
        });
      } else if (postId !== undefined && postId !== "") {
        return await prisma.createComment({
          user: {
            connect: {
              id: user.id
            }
          },
          post: {
            connect: {
              id: postId
            }
          },
          text
        });
      } else if (supportId !== undefined && supportId !== "") {
        return await prisma.createComment({
          user: {
            connect: {
              id: user.id
            }
          },
          support: {
            connect: {
              id: supportId
            }
          },
          text
        });
      } else {
        throw Error("You can't do that. Empty ID.");
      }
    }
  }
};
