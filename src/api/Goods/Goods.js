import { prisma } from "../../../generated/prisma-client";

export default {
  Goods: {
    comments: ({ id }) => prisma.goods({ id }).comments(),
    user: ({ id }) => prisma.goods({ id }).user(),
    bookmarks: ({ id }) => prisma.goods({ id }).bookmarks(),
    registedProducts: ({ id }) => prisma.goods({ id }).registedProducts(),
    support: ({ id }) => prisma.goods({ id }).support(),

    isBookmarked: (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.bookmark({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            goods: {
              id
            }
          }
        ]
      });
    },

    bookmarkCount: parent =>
      prisma
        .bookmarksConnection({
          where: { goods: { id: parent.id } }
        })
        .aggregate()
        .count(),

    commentCount: parent =>
      prisma
        .commentsConnection({
          where: { goods: { id: parent.id } }
        })
        .aggregate()
        .count()
  }
};
