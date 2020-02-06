import { prisma } from "../../../generated/prisma-client";

export default {
  Support: {
    user: ({ id }) => prisma.support({ id }).user(),
    stars: ({ id }) => prisma.support({ id }).stars(),
    goodses: ({ id }) => prisma.support({ id }).goodses(),
    comments: ({ id }) => prisma.support({ id }).comments(),
    likes: ({ id }) => prisma.support({ id }).likes(),

    isLiked: (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            support: {
              id
            }
          }
        ]
      });
    },

    likeCount: parent =>
      prisma
        .likesConnection({
          where: { support: { id: parent.id } }
        })
        .aggregate()
        .count(),

    commentCount: parent =>
      prisma
        .commentsConnection({
          where: { support: { id: parent.id } }
        })
        .aggregate()
        .count()
  }
};
