import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLikeOfPost: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;

      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      };

      try {
        const existingLike = await prisma.$exists.like(filterOptions);

        if (existingLike) {
          const like = await prisma.likes({ where: filterOptions });

          if (like !== null) {
            await prisma.updatePost({
              data: {
                likes: { delete: { id: like[0].id } }
              },
              where: { id: postId }
            });
          }
        } else {
          await prisma.updatePost({
            data: {
              likes: {
                create: { user: { connect: { id: user.id } } }
              }
            },
            where: { id: postId }
          });
        }
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
