import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLikeOfSupport: async (_, args, { request }) => {
      isAuthenticated(request);
      const { supportId } = args;
      const { user } = request;

      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            support: {
              id: supportId
            }
          }
        ]
      };

      try {
        const existingLike = await prisma.$exists.like(filterOptions);

        if (existingLike) {
          const like = await prisma.likes({ where: filterOptions });

          if (like !== null) {
            await prisma.updateSupport({
              data: {
                likes: { delete: { id: like[0].id } }
              },
              where: { id: supportId }
            });
          }
        } else {
          await prisma.updateSupport({
            data: {
              likes: {
                create: { user: { connect: { id: user.id } } }
              }
            },
            where: { id: supportId }
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
