import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleBookmark: async (_, args, { request }) => {
      isAuthenticated(request);
      const { goodsId } = args;
      const { user } = request;

      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            goods: {
              id: goodsId
            }
          }
        ]
      };

      try {
        const existingBookmark = await prisma.$exists.bookmark(filterOptions);

        if (existingBookmark) {
          const bookmark = await prisma.bookmarks({ where: filterOptions });

          if (bookmark !== null) {
            await prisma.updateGoods({
              data: {
                bookmarks: { delete: { id: bookmark[0].id } }
              },
              where: { id: goodsId }
            });
          }
        } else {
          await prisma.updateGoods({
            data: {
              bookmarks: {
                create: { user: { connect: { id: user.id } } }
              }
            },
            where: { id: goodsId }
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
